from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
import os
import json
from pypdf import PdfReader
import google.generativeai as genai

app = FastAPI(title="API Agent IA Financier - Cerveau Gemini", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# On récupère la clé secrète depuis le coffre-fort Render
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@app.post("/extract-pdf")
async def extract_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Merci d'envoyer un vrai fichier PDF.")
    
    try:
        # 1. On ouvre le PDF et on extrait tout le texte brut
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        reader = PdfReader(pdf_file)
        
        extracted_text = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text + "\n"
        
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Le PDF semble être une image ou un scan sans texte lisible.")

        # 2. On envoie le texte au cerveau IA avec une consigne métier (Prompt)
        if not GEMINI_API_KEY:
            raise HTTPException(status_code=500, detail="Clé API non configurée.")

        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"""
        Tu es un assistant comptable expert pour les DAF. Voici le texte extrait d'une facture.
        Ton travail est de trouver les informations suivantes et de me les renvoyer STRICTEMENT au format JSON.
        Ne réponds rien d'autre que l'objet JSON.
        
        Format attendu :
        {{
            "fournisseur": "Nom de l'entreprise",
            "montant_ttc": 0.00,
            "tva": 0.00,
            "iban": "Le numéro IBAN, ou N/A s'il n'y en a pas"
        }}
        
        Voici le texte de la facture :
        {extracted_text}
        """
        
        response = model.generate_content(prompt)
        
        # 3. On nettoie la réponse de l'IA pour s'assurer que c'est bien du JSON propre
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text.replace("```json", "").replace("```", "").strip()
        
        # On transforme le texte en vraies données
        extracted_data = json.loads(response_text)

        return {
            "message": "Analyse IA terminée avec succès.",
            "filename": file.filename,
            "data": extracted_data
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="L'IA n'a pas pu structurer les données correctement.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur du serveur IA : {str(e)}")
