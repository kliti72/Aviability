import type { CreateUsersDto, Users } from "../../types/auth/types"
import * as usersRepository from "../../repositories/auth/users.repository"

export const usersService = {

  getAll() {
    return usersRepository.findAll()
  },

  getById(id: number) {
    const item = usersRepository.findById(id)
    if (!item) throw new Error(`Users ${id} not found.`)
    return item
  },

  getByEmail(email: string) {
    const item = usersRepository.findByEmail(email);
    return item
  },

  create(dto: CreateUsersDto) {
    const base = dto.givenName.toLowerCase()
      .normalize("NFD")                        // rimuove accenti
      .replace(/[\u0300-\u036f]/g, "")         // rimuove diacritici
      .replace(/[^a-z0-9]/g, "-")             // caratteri speciali → -
      .replace(/-+/g, "-")                     // doppi trattini → -
      .replace(/^-|-$/g, "")                   // trim trattini bordi

    const suffix = Math.random().toString(36).slice(2, 6) // 4 chars random
    dto.handle = `${base}-${suffix}`         // → "marco-x7k2"

    return usersRepository.insert(dto)
  },

  createFromEmail(email: string, meta?: { ipAddress?: string; userAgent?: string }) {
  const base = email.split('@')[0] || 'user'

  // Handle: lowercase, solo alfanumerico + underscore, max 32 char
  const handle = base
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .slice(0, 28)
    .concat('_' + Math.floor(Math.random() * 999).toString().padStart(3, '0'))

  const dto: CreateUsersDto = {
    email,
    verifiedEmail: false,
    name:       base,
    givenName:  base,
    familyName: '',
    picture:    '',
    locale:     '',
    handle,
    // cifra lato app prima di passare questi valori
    ipAddress:  meta?.ipAddress ?? null,
    userAgent:  meta?.userAgent?.slice(0, 512) ?? null,
  }

  return usersRepository.insert(dto)
  },

  update(id: number, dto: Partial<CreateUsersDto>) {
    const updated = usersRepository.update(id, dto)
    if (!updated) throw new Error(`Users ${id} not found.`)
    return updated
  },

  delete(id: number) {
    const deleted = usersRepository.remove(id)
    if (!deleted) throw new Error(`Users ${id} not found.`)
    return { ok: true }
  },

  verifyEmail(id: number) {
    const user = usersRepository.findById(id)
    if (!user) throw new Error(`Users ${id} not found.`)
    return usersRepository.update(id, { verifiedEmail: true })
  },

  updateUserData(id: number, data: Partial<Pick<Users, 'name' | 'givenName'>>) {
    const user = usersRepository.findById(id)
    if (!user) throw new Error(`Users ${id} not found.`)
    return usersRepository.update(id, data)
  },

}
