/**
 * Centrale catalogus van afbeeldingen.
 * Voor nu verwijzen we naar de bestaande WordPress-bibliotheek van campingdehinde.nl.
 * Vervang URL's later door lokale bestanden in /public/images/.
 */

const WP = "https://campingdehinde.nl/WP/wp-content/uploads";

export const img = {
  // Camping algemeen
  campingveld1: `${WP}/2019/02/Campingveld.jpg`,
  campingveld2: `${WP}/2019/02/Campingveld-2.jpg`,
  campingfield: `${WP}/2016/04/P1130143-e1485163233200.jpg`,
  camperfield: `${WP}/2016/04/P1130149.jpg`,
  panorama: `${WP}/2017/11/Naamloos_panorama1.jpg`,
  lente: `${WP}/2019/02/Lente.jpg`,

  // Speel & beleving
  speelveld: `${WP}/2019/02/Speelveld.jpg`,
  strohoek: `${WP}/2017/11/StroHoek.jpg`,
  stroplay: `${WP}/2017/01/IMG_4377.jpg`,
  zandbak: `${WP}/2017/01/IMG_4337.jpg`,
  tractorplay: `${WP}/2017/01/IMG_4251.jpg`,
  skelters: `${WP}/2017/01/IMG_4378.jpg`,
  shovel: `${WP}/2019/02/Shovel.jpg`,
  kruiwagen: `${WP}/2019/02/Kruiwagen.jpg`,
  pretpad1: `${WP}/2017/01/IMG_4273-e1617438681299.jpg`,
  pretpad2: `${WP}/2017/01/IMG_4276-e1617438666264.jpg`,

  // Dieren
  konijnAaien: `${WP}/2019/02/Konijn-aaien.jpg`,
  geitAaien: `${WP}/2019/02/Geit-aaien.jpg`,
  ponyveld: `${WP}/2017/01/IMG_4280.jpg`,
  pony: `${WP}/2019/02/Pony.jpg`,
  kippen: `${WP}/2017/01/P1130191.jpg`,
  dierenverzorging: `${WP}/2017/11/Dierenverzorging.jpg`,

  // Eten & drinken
  brood: `${WP}/2022/04/brood-camping-300x214.jpg`,
  eieren: `${WP}/2021/04/Etjes2-300x231.jpg`,

  // Faciliteiten
  wifi: `${WP}/2017/01/wifi-camping.jpg`,
  stalloon: `${WP}/2017/01/IMG_4392.jpg`,
  wassen: `${WP}/2017/01/IMG_4334.jpg`,

  // Accommodaties
  safaritent: `${WP}/2021/08/SafaritentDeHinde4-1024x768.jpg`,
  safaritentPlan: `${WP}/2021/05/Safaritent-1.jpg`,
  duolodgeOpen: `${WP}/2025/02/Duolodge-De-Hinde-Open.jpg`,
  duolodgeGesloten: `${WP}/2025/02/Duolodge-De-Hinde-Gesloten.jpg`,
  hindehutPlan: `${WP}/2021/05/Hindehut.jpg`,
  hindehut1: `${WP}/2022/08/Hindehut-1.jpg`,
  hindehut2: `${WP}/2022/08/Hindehut-2.jpg`,
  hindehutInterior1: `${WP}/2018/03/20180323084654.jpg`,
  hindehutInterior2: `${WP}/2018/03/20180323084701.jpg`,
  hindehutInterior3: `${WP}/2018/03/20180323084706.jpg`,
  hindehutPanorama: `${WP}/2018/03/20180323084708.jpg`,
  hindehutExterior: `${WP}/2018/03/20180323084734.jpg`,
  hooiberghut1: `${WP}/2022/03/Hooiberghut-2.jpg`,
  hooiberghut2: `${WP}/2022/03/Hooiberghut-3.jpg`,
  hooiberghut3: `${WP}/2022/03/Hooiberghut-4.jpg`,
  hooiberghut4: `${WP}/2022/03/Hooiberghut-5.jpg`,
  hooiberghut5: `${WP}/2022/03/Hooiberghut-6.jpg`,
  hooiberghutPlan: `${WP}/2021/05/Hooiberghut-1-1024x987.jpg`,

  // Omgeving
  dronterstrand: `${WP}/2016/04/Dronterstrand.jpg`,
  dronten: `${WP}/2017/01/1-Dronten1.jpg`,
  elburg: `${WP}/2017/01/2016050533.jpg`,
  kampen: `${WP}/2017/01/397734.jpg`,
} as const;

export type ImageKey = keyof typeof img;
