export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

const CONTACT_MESSAGES_KEY = 'restaurant_contact_messages'

export function getContactMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(CONTACT_MESSAGES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage {
  const messages = getContactMessages()
  const newMessage: ContactMessage = {
    ...message,
    id: `MSG-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify([...messages, newMessage]))
  return newMessage
}

export function deleteContactMessage(messageId: string) {
  localStorage.setItem(
    CONTACT_MESSAGES_KEY,
    JSON.stringify(getContactMessages().filter((message) => message.id !== messageId))
  )
}
