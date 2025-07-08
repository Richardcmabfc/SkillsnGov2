#!/bin/bash

# SkillsNGo - Script de déploiement
# Usage: ./deploy.sh [platform]
# Platforms: netlify, vercel, github-pages, local

set -e

PLATFORM=${1:-local}
PROJECT_NAME="skillsngo-production"

echo "🚀 Déploiement de SkillsNGo..."
echo "📦 Plateforme: $PLATFORM"

# Vérifier les prérequis
if ! command -v /home/scrapybara/.bun/bin/bun &> /dev/null; then
    echo "❌ Bun n'est pas installé. Installation requise."
    exit 1
fi

# Vérifier le fichier .env
if [ ! -f .env ]; then
    echo "⚠️  Fichier .env manquant. Copie depuis .env.example..."
    cp .env.example .env
    echo "✏️  Veuillez modifier .env avec vos variables Supabase avant de continuer."
    echo "📝 Variables requises:"
    echo "   - VITE_SUPABASE_URL"
    echo "   - VITE_SUPABASE_ANON_KEY"
    read -p "Appuyez sur Entrée une fois .env configuré..."
fi

# Installation des dépendances
echo "📥 Installation des dépendances..."
/home/scrapybara/.bun/bin/bun install

# Build du projet
echo "🔨 Construction du projet..."
/home/scrapybara/.bun/bin/bun run build

case $PLATFORM in
    "local")
        echo "🏠 Démarrage du serveur local..."
        echo "✅ Build terminé!"
        echo "📁 Fichiers générés dans: ./dist"
        echo "🌐 Pour tester localement:"
        echo "   /home/scrapybara/.bun/bin/bun preview"
        
        # Demander si on veut démarrer le serveur
        read -p "Démarrer le serveur de prévisualisation? (y/N): " start_server
        if [[ $start_server =~ ^[Yy]$ ]]; then
            /home/scrapybara/.bun/bin/bun preview
        fi
        ;;
    
    *)
        echo "❌ Plateforme non reconnue: $PLATFORM"
        echo "Plateformes supportées: local (autres à venir)"
        exit 1
        ;;
esac

echo ""
echo "🎉 Déploiement terminé!"
echo "📚 Documentation: README.md"
echo "🔧 Configuration: .env"
echo "🌐 Build: ./dist"
