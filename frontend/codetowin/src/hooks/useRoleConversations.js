import { useState, useEffect } from 'react';
import { messagesApi } from '../api/messages';
import { extractArray, normalizeConversation } from '../services/normalizers';

/**
 * Hook pour charger les conversations d'un rôle donné.
 * Gère le fallback vers des données mockées si l'API échoue ou est vide.
 * 
 * @param {string} role - Le rôle ('mentor', 'organizer', 'participant')
 * @param {Object} fallbacks - { mockChats, mockTabs } Les données de repli
 * @returns {Object} { tabs, chats, loading }
 */
export function useRoleConversations(role, { mockChats = [], mockTabs = [] } = {}) {
  const [tabs, setTabs] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoading(true);
        const data = await messagesApi.getConversations(role);
        const conversations = extractArray(data);
        
        if (conversations.length > 0) {
          const normalizedChats = conversations.map(normalizeConversation);
          setChats(normalizedChats);
          
          // Construire les tabs à partir des catégories trouvées
          const allTabs = ['Toutes', ...new Set(normalizedChats.map(c => c.category).filter(Boolean))];
          setTabs(allTabs);
        } else {
          setChats(mockChats);
          setTabs(mockTabs);
        }
      } catch (err) {
        console.warn(`Erreur api messages (${role}), utilisation du mock`, err);
        setChats(mockChats);
        setTabs(mockTabs);
      } finally {
        setLoading(false);
      }
    };
    
    loadChats();
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps

  return { tabs, chats, loading };
}
