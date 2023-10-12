export interface EmployeeEntry {
  id: number,
  name: string,
  email: string,
  cpf: string,
  phone: string|null,
  validated_at: string|null,
  is_valid: number|null,
  created_at: string,
  updated_at: string
}
