import { SvgIconProps } from "@mui/material"

export type ChartColor = "warning" | "error" | "success"
export type Subscription = "BASIC" | "INTERMEDIATE" | "ADVANCED"
export type CourseName = "Introduction to Coding" | "Certificate in Python Programing" | "Certificate in Data Science"
export interface cirrulumCard {
    subscription: Subscription,
    title: CourseName,
    validity: "24th April, 2024",
    price: number,
    topics: string[],
    extraInfo: string[],
    icon: SvgIconProps,
    total_lessons: number
}