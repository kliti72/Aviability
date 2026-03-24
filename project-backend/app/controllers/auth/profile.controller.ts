import Elysia from "elysia";
import * as profileRepository from '../../repositories/auth/users.repository';

export const ProfileController = new Elysia({ prefix: '/profile' })

