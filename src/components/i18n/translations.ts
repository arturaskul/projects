export type Language = "lt" | "en";

export type TranslationKey =
  | "nav.gallery"
  | "nav.training"
  | "nav.contact"
  | "hero.title"
  | "hero.subtitle"
  | "hero.cta.gallery"
  | "hero.cta.contact"
  | "shop.subtitle"
  | "services.title"
  | "services.haircut.title"
  | "services.haircut.desc"
  | "services.beard.title"
  | "services.beard.desc"
  | "services.towel.title"
  | "services.towel.desc"
  | "training.title"
  | "training.subtitleTitle"
  | "training.subtitleText"
  | "training.learn.title"
  | "training.learn.item1"
  | "training.learn.item2"
  | "training.learn.item3"
  | "training.learn.item4"
  | "training.learn.item5"
  | "training.details.title"
  | "training.details.item1"
  | "training.details.item2"
  | "training.details.item3"
  | "training.details.item4"
  | "training.details.item5"
  | "training.enroll"
  | "gallery.title"
  | "gallery.home"
  | "gallery.description"
  | "contact.title"
  | "contact.home"
  | "contact.gallery"
  | "contact.addressLabel"
  | "contact.phoneLabel"
  | "contact.hoursLabel"
  | "days.sunday"
  | "days.monday"
  | "days.tuesday"
  | "days.wednesday"
  | "days.thursday"
  | "days.friday"
  | "days.saturday"
  | "hours.closed"
  | "footer.rights"
  | "contact.form.title"
  | "contact.form.name"
  | "contact.form.namePlaceholder"
  | "contact.form.email"
  | "contact.form.emailPlaceholder"
  | "contact.form.phone"
  | "contact.form.phonePlaceholder"
  | "contact.form.submit"
  | "contact.form.success";

const translations: Record<Language, Record<TranslationKey, string>> = {
  lt: {
    "nav.gallery": "Galerija",
    "nav.training": "Mokymai",
    "nav.contact": "Kontaktai",
    "hero.title": "Barber akademija",
    "hero.subtitle":
      "Profesionalūs barberio mokymai Panevėžyje. Išmok modernių technikų nuo pagrindų iki pažengusių.",
    "hero.cta.gallery": "Peržiūrėti darbus",
    "hero.cta.contact": "Susisiekti",
    "shop.subtitle":
      "Aukščiausios kokybės vyriško kirpimo ir barzdos priežiūros paslaugos Panevėžyje.",
    "services.title": "Mūsų paslaugos",
    "services.haircut.title": "Kirpimas",
    "services.haircut.desc": "Profesionalus kirpimas su formavimu ir užbaigimu.",
    "services.beard.title": "Barzdos kirpimas",
    "services.beard.desc": "Tikslus barzdos formavimas ir kirpimas.",
    "services.towel.title": "Skutimas su karštu rankšluosčiu",
    "services.towel.desc": "Klasikinis skutimas su karštais rankšluosčiais.",
    "training.title": "Egoisto Barber Shop",
    "training.subtitleTitle": "Profesionalūs barberio mokymai",
    "training.subtitleText":
      "Prisijunk prie mūsų mokymų programos ir išmok modernių barberio technikų nuo pagrindų iki pažengusių.",
    "training.learn.title": "Ko išmoksi",
    "training.learn.item1": "Klasikinio ir modernaus kirpimo technikų",
    "training.learn.item2": "Barzdos kirpimo ir formavimo",
    "training.learn.item3": "Skutimo su karštu rankšluosčiu",
    "training.learn.item4": "Kliento konsultavimo įgūdžių",
    "training.learn.item5": "Higienos ir saugos praktikos",
    "training.details.title": "Programos informacija",
    "training.details.item1": "8 savaičių intensyvi programa",
    "training.details.item2": "Praktika su realiais klientais",
    "training.details.item3": "Mažos grupės ir individualus dėmesys",
    "training.details.item4": "Pagalba įsidarbinant",
    "training.details.item5": "Sertifikatas po programos",
    "training.enroll": "Registruotis",
    "gallery.title": "Galerija",
    "gallery.home": "Pagrindinis",
    "gallery.description":
      "Čia bus jūsų darbų nuotraukos (vėliau galime prijungti prie Supabase Storage).",
    "contact.title": "Kontaktai",
    "contact.home": "Pagrindinis",
    "contact.gallery": "Galerija",
    "contact.addressLabel": "Adresas",
    "contact.phoneLabel": "Telefonas",
    "contact.hoursLabel": "Darbo laikas",
    "days.sunday": "Sekmadienis",
    "days.monday": "Pirmadienis",
    "days.tuesday": "Antradienis",
    "days.wednesday": "Trečiadienis",
    "days.thursday": "Ketvirtadienis",
    "days.friday": "Penktadienis",
    "days.saturday": "Šeštadienis",
    "hours.closed": "Nedirbame",
    "footer.rights": "Visos teisės saugomos.",
    "contact.form.title": "Susisiekite su mumis",
    "contact.form.name": "Vardas",
    "contact.form.namePlaceholder": "Įveskite savo vardą",
    "contact.form.email": "El. paštas",
    "contact.form.emailPlaceholder": "Įveskite savo el. paštą",
    "contact.form.phone": "Telefonas",
    "contact.form.phonePlaceholder": "Įveskite savo telefono numerį",
    "contact.form.submit": "Siųsti",
    "contact.form.success": "Ačiū! Jūsų žinutė išsiųsta.",
  },
  en: {
    "nav.gallery": "Gallery",
    "nav.training": "Training",
    "nav.contact": "Contact",
    "hero.title": "Barber Academy",
    "hero.subtitle":
      "Professional barber training in Panevėžys. Learn modern techniques from fundamentals to advanced styling.",
    "hero.cta.gallery": "View Our Work",
    "hero.cta.contact": "Contact Us",
    "shop.subtitle":
      "Premium men's grooming services in Panevėžys. Fresh cuts, sharp beards, and classic shaves.",
    "services.title": "Our Services",
    "services.haircut.title": "Haircut",
    "services.haircut.desc": "Professional haircut with styling and finish.",
    "services.beard.title": "Beard Trim",
    "services.beard.desc": "Precise beard shaping and trimming.",
    "services.towel.title": "Hot Towel Shave",
    "services.towel.desc": "Classic straight razor shave with hot towels.",
    "training.title": "Egoisto Barber Shop",
    "training.subtitleTitle": "Professional Barber Training",
    "training.subtitleText":
      "Join our training program and master modern barbering from fundamentals to advanced styling.",
    "training.learn.title": "What You'll Learn",
    "training.learn.item1": "Classic and modern haircut techniques",
    "training.learn.item2": "Beard trimming and styling",
    "training.learn.item3": "Hot towel shaving",
    "training.learn.item4": "Client consultation skills",
    "training.learn.item5": "Sanitation and safety practices",
    "training.details.title": "Program Details",
    "training.details.item1": "8-week intensive program",
    "training.details.item2": "Hands-on training with real clients",
    "training.details.item3": "Small class sizes for personalized attention",
    "training.details.item4": "Job placement assistance",
    "training.details.item5": "Certification upon completion",
    "training.enroll": "Enroll Now",
    "gallery.title": "Gallery",
    "gallery.home": "Home",
    "gallery.description":
      "Add your haircut photos here (later we can connect this to Supabase Storage).",
    "contact.title": "Contact",
    "contact.home": "Home",
    "contact.gallery": "Gallery",
    "contact.addressLabel": "Address",
    "contact.phoneLabel": "Phone",
    "contact.hoursLabel": "Hours",
    "days.sunday": "Sunday",
    "days.monday": "Monday",
    "days.tuesday": "Tuesday",
    "days.wednesday": "Wednesday",
    "days.thursday": "Thursday",
    "days.friday": "Friday",
    "days.saturday": "Saturday",
    "hours.closed": "Closed",
    "footer.rights": "All rights reserved.",
    "contact.form.title": "Contact Us",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Enter your name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "Enter your email",
    "contact.form.phone": "Phone",
    "contact.form.phonePlaceholder": "Enter your phone number",
    "contact.form.submit": "Send",
    "contact.form.success": "Thank you! Your message has been sent.",
  },
};

export function translate(lang: Language, key: TranslationKey) {
  return translations[lang][key];
}
