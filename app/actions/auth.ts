'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export type AuthState = { error: string } | null

export async function login(_prevState: AuthState, _formData: FormData): Promise<AuthState> {
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(_prevState: AuthState, _formData: FormData): Promise<AuthState> {
  redirect('/dashboard')
}

export async function logout() {
  revalidatePath('/', 'layout')
  redirect('/login')
}
