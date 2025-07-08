#!/bin/bash

# 🚀 Script de Déploiement SkillsNGo
# Déploie automatiquement l'application sur différentes plateformes

set -e

echo "🚀 SkillsNGo - Script de Déploiement"
echo "=================================="

# Variables
PROJECT_NAME="skillsngo"
BUILD_DIR="skillsngo-deploy"
VERSION=$(date +"%Y%m%d-%H%M%S")

echo "📦 Version: $VERSION"
echo "📁 Dossier: $BUILD_DIR"

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "index.html" ]; then
    echo "❌ Erreur: index.html non trouvé. Exécutez depuis le dossier $BUILD_DIR"
    exit 1
fi

echo "✅ Fichiers du projet détectés"

# Fonction pour tester l'application localement
test_local() {
    echo ""
    echo "🧪 TEST LOCAL"
    echo "============="
    
    # Vérifier si un serveur est déjà en cours
    if pgrep -f "python.*http.server" > /dev/null; then
        echo "✅ Serveur Python déjà en cours"
        SERVER_PID=$(pgrep -f "python.*http.server")
        echo "🔗 URL: http://localhost:8080"
        echo "🛑 Pour arrêter: kill $SERVER_PID"
    else
        echo "🚀 Démarrage serveur de test..."
        python3 -m http.server 8080 &
        SERVER_PID=$!
        sleep 2
        echo "✅ Serveur démarré (PID: $SERVER_PID)"
        echo "🔗 URL: http://localhost:8080"
        echo "🛑 Pour arrêter: kill $SERVER_PID"
    fi
    
    echo ""
    echo "🔐 COMPTES DE TEST:"
    echo "  admin001 / skillsngo2024 (Administrateur)"
    echo "  app001 / skillsngo2024 (Apprenti)"
    echo "  prof001 / skillsngo2024 (Professeur)"  
    echo "  maitre001 / skillsngo2024 (Maître)"
}

# Instructions de déploiement
echo ""
echo "📋 INSTRUCTIONS DE DÉPLOIEMENT"
echo "=============================="
echo ""
echo "🌐 NETLIFY (Recommandé - Gratuit):"
echo "1. Allez sur https://netlify.com"
echo "2. Créez un compte gratuit"
echo "3. Glissez-déposez ce dossier sur netlify.com"
echo "4. URL publique générée automatiquement"
echo ""
echo "⚡ VERCEL (Gratuit):"
echo "1. npm install -g vercel"
echo "2. vercel --prod"
echo ""
echo "🐙 GITHUB PAGES (Gratuit):"
echo "1. Créez un repo GitHub public"
echo "2. Uploadez ces fichiers"
echo "3. Activez Pages dans Settings"
echo ""

# Lancer le test local
test_local