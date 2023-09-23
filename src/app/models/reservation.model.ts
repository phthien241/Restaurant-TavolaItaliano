import { Time } from "@angular/common"

export interface Reservation{
    name: string,
    size: number,
    branch: string,
    date: Date,
    time: Time
}
