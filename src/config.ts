export const LINKS = {
  film: "https://drive.google.com/drive/folders/1yOH_R5OLjpgNuuwgPulSoXWXnp2PIGiZ?usp=sharing",
  email: "mailto:sy1615870@gmail.com",
  line: "https://line.me/ti/p/77XdfK83ff",
  phone: "tel:+886913051530",
};

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
