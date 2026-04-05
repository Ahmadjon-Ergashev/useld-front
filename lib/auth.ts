const globalSessions = globalThis as unknown as { sessions: Map<string, number> | undefined }
export const sessions = globalSessions.sessions || new Map<string, number>()
if (process.env.NODE_ENV !== 'production') globalSessions.sessions = sessions
