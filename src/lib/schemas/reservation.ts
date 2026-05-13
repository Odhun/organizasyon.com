import { z } from "zod";

export const reservationSchema = z.object({
  customerName: z.string().min(2, "Ad soyad en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z
    .string()
    .min(10, "Telefon numarası en az 10 karakter olmalı")
    .regex(/^[0-9+\s\-()]+$/, "Geçerli bir telefon numarası giriniz"),
  eventType: z.string().min(1, "Etkinlik türü seçiniz"),
  eventDate: z.string().min(1, "Etkinlik tarihi seçiniz"),
  guestCount: z.string().optional(),
  location: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
