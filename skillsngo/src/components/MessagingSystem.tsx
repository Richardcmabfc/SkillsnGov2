import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Plus, 
  User, 
  Calendar, 
  Paperclip,
  MoreVertical,
  Reply,
  Forward,
  Trash2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Message } from '../types';
import { mockMessages, mockUsers } from '../data/mockData';

interface MessagingSystemProps {
  isFullscreen?: boolean;
  onClose?: () => void;
}

const MessagingSystem = ({ isFullscreen = true, onClose }: MessagingSystemProps) => {
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState({
    destinataires: [] as string[],
    sujet: '',
    contenu: '',
    contexte: 'general' as 'general' | 'competence' | 'evaluation' | 'journal'
  });

  // Filtrer les messages pertinents pour l'utilisateur
  const userMessages = mockMessages.filter(message => 
    message.destinataires.includes(user?.id || '') || message.expediteur_id === user?.id
  );

  const filteredMessages = userMessages.filter(message =>
    message.sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.expediteur_nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Envoi du message:', newMessage);
    setShowNewMessage(false);
    setNewMessage({
      destinataires: [],
      sujet: '',
      contenu: '',
      contexte: 'general'
    });
  };

  const getContexteColor = (contexte: string) => {
    switch (contexte) {
      case 'competence': return 'bg-blue-100 text-blue-800';
      case 'evaluation': return 'bg-green-100 text-green-800';
      case 'journal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContexteLabel = (contexte: string) => {
    switch (contexte) {
      case 'competence': return 'Compétence';
      case 'evaluation': return 'Évaluation';
      case 'journal': return 'Journal';
      default: return 'Général';
    }
  };

  const availableUsers = mockUsers.filter(u => u.id !== user?.id);

  const containerClass = isFullscreen 
    ? "h-screen bg-white" 
    : "h-96 bg-white rounded-lg border border-gray-200";

  return (
    <div className={containerClass}>
      <div className="flex h-full">
        {/* Liste des messages */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowNewMessage(true)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Nouveau message"
                >
                  <Plus className="w-5 h-5" />
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Liste des messages */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-900">
                            {message.expediteur_nom}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(message.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {!message.lu && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="mb-2">
                      <div className="font-medium text-sm text-gray-900 mb-1">
                        {message.sujet}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {message.contenu}
                      </p>
                    </div>

                    {message.contexte !== 'general' && (
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getContexteColor(message.contexte)}`}>
                        {getContexteLabel(message.contexte)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Aucun message trouvé</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contenu du message */}
        <div className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              {/* Header du message */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {selectedMessage.sujet}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                        <User className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="mr-2">{selectedMessage.expediteur_nom}</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(selectedMessage.date).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Reply className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Forward className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {selectedMessage.contexte !== 'general' && (
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${getContexteColor(selectedMessage.contexte)}`}>
                    {getContexteLabel(selectedMessage.contexte)}
                  </span>
                )}
              </div>

              {/* Contenu du message */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.contenu}
                  </p>
                </div>
              </div>

              {/* Zone de réponse */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <textarea
                      placeholder="Votre réponse..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Sélectionnez un message</p>
                <p className="text-sm">Choisissez un message dans la liste pour le lire</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal nouveau message */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Nouveau message</h3>
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinataires
                </label>
                <select 
                  multiple
                  value={newMessage.destinataires}
                  onChange={(e) => setNewMessage(prev => ({
                    ...prev,
                    destinataires: Array.from(e.target.selectedOptions, option => option.value)
                  }))}
                  className="input h-24"
                  required
                >
                  {availableUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.prenom} {user.nom} ({user.role})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Maintenez Ctrl/Cmd pour sélectionner plusieurs destinataires
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contexte
                </label>
                <select
                  value={newMessage.contexte}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, contexte: e.target.value as any }))}
                  className="input"
                >
                  <option value="general">Général</option>
                  <option value="competence">Compétence</option>
                  <option value="evaluation">Évaluation</option>
                  <option value="journal">Journal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  value={newMessage.sujet}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, sujet: e.target.value }))}
                  className="input"
                  placeholder="Objet du message"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={newMessage.contenu}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, contenu: e.target.value }))}
                  className="input h-32"
                  placeholder="Votre message..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewMessage(false)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingSystem;