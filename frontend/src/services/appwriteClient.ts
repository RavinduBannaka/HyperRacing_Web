import { Account, Client, Databases, ID, Query } from 'appwrite'
import type { Models, RealtimeResponseEvent } from 'appwrite'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

export const appwriteConfig = {
  endpoint,
  projectId,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collections: {
    cars: import.meta.env.VITE_APPWRITE_CARS_COLLECTION_ID,
    categories: import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID,
    storeCards: import.meta.env.VITE_APPWRITE_STORE_CARDS_COLLECTION_ID,
    users: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  },
}

export const isAppwriteConfigured = () => Boolean(endpoint && projectId)
export const isAppwriteDatabaseConfigured = () => Boolean(endpoint && projectId && appwriteConfig.databaseId)

export const appwriteClient = new Client()

if (endpoint && projectId) {
  appwriteClient.setEndpoint(endpoint).setProject(projectId)
}

export const appwriteAccount = new Account(appwriteClient)
export const appwriteDatabases = new Databases(appwriteClient)

export type AppwriteDocument<T> = Models.Document & T

export const appwriteAuth = {
  async login(email: string, password: string) {
    await appwriteAccount.createEmailPasswordSession(email, password)
    return appwriteAccount.get()
  },

  async register(data: { email: string; password: string; displayName: string }) {
    await appwriteAccount.create(ID.unique(), data.email, data.password, data.displayName)
    await appwriteAccount.createEmailPasswordSession(data.email, data.password)
    return appwriteAccount.get()
  },

  async currentUser() {
    return appwriteAccount.get()
  },

  async logout() {
    return appwriteAccount.deleteSession('current')
  },
}

export const listCollection = async <T>(collectionId?: string) => {
  if (!isAppwriteDatabaseConfigured() || !collectionId) {
    return []
  }

  const response = await appwriteDatabases.listDocuments<AppwriteDocument<T>>(
    appwriteConfig.databaseId,
    collectionId,
    [Query.limit(100)],
  )

  return response.documents
}

export const subscribeCollection = <T>(
  collectionId: string | undefined,
  onChange: (event: RealtimeResponseEvent<AppwriteDocument<T>>) => void,
) => {
  if (!isAppwriteDatabaseConfigured() || !collectionId) {
    return () => undefined
  }

  return appwriteClient.subscribe<AppwriteDocument<T>>(
    `databases.${appwriteConfig.databaseId}.collections.${collectionId}.documents`,
    onChange,
  )
}
