export interface KeretaType {
    id: number
    name: string
    descriptions: string
    type: string
    app_user_token: string
    createdAt: string
    updatedAt: string
    wagons: GerbongType[]
  }

  export interface GerbongType{
    id: number
    name: string
    train_id: number
    seat_count: number
    createdAt: string
    updatedAt: string
    seats: KursiType[]
  }

  export interface KursiType {
    id: number
    seat_number: string
    wagon_id: number
    createdAt: string
    updatedAt: string
  }
  
  export interface UserType {
    id: number
    nik: string
    name: string
    address: string
    phone: string
    user_id: number
    app_user_token: string
    createdAt: string
    updatedAt: string
    user_details: UserDetails
  }
  
  export interface UserDetails {
    id: number
    username: string
    password: string
    role: string
    app_user_token: string
    createdAt: string
    updatedAt: string
  }
  