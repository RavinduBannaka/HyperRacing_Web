import { useEffect, useState } from 'react'
import { listCollection, subscribeCollection } from '../services/appwriteClient'

type UseAppwriteCollectionState<T> = {
  data: T[]
  loading: boolean
  error: string
  live: boolean
}

export const useAppwriteCollection = <T,>(
  collectionId: string | undefined,
  mapDocument: (document: any) => T,
  fallback: T[] = [],
): UseAppwriteCollectionState<T> => {
  const [data, setData] = useState<T[]>(fallback)
  const [loading, setLoading] = useState(Boolean(collectionId))
  const [error, setError] = useState('')
  const [live, setLive] = useState(false)

  useEffect(() => {
    let mounted = true

    if (!collectionId) {
      setData(fallback)
      setLoading(false)
      setLive(false)
      return undefined
    }

    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const documents = await listCollection(collectionId)
        if (mounted) {
          setData(documents.map(mapDocument))
          setLive(true)
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error).message || 'Unable to load Appwrite collection.')
          setData(fallback)
          setLive(false)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    const unsubscribe = subscribeCollection(collectionId, () => {
      load()
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [collectionId, fallback, mapDocument])

  return { data, loading, error, live }
}
