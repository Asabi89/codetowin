const LOCAL_COUNTRIES_FR = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Antigua-et-Barbuda", "Arabie Saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan", 
  "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie (Myanmar)", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", 
  "Cabo Verde", "Cambodge", "Cameroun", "Canada", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo-Brazzaville", "Congo-Kinshasa", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d'Ivoire", "Croatie", "Cuba", 
  "Danemark", "Djibouti", "Dominique", 
  "Égypte", "Émirats Arabes Unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie", 
  "Fidji", "Finlande", "France", 
  "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée équatoriale", "Guinée-Bissau", "Guyana", 
  "Haïti", "Honduras", "Hongrie", 
  "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie", 
  "Jamaïque", "Japon", "Jordanie", 
  "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït", 
  "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie", "Luxembourg", 
  "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Marshall", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique", 
  "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège", "Nouvelle-Zélande", 
  "Oman", "Ouganda", "Ouzbékistan", 
  "Pakistan", "Palaos", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal", 
  "Qatar", 
  "République centrafricaine", "République dominicaine", "Roumanie", "Royaume-Uni", "Russie", "Rwanda", 
  "Saint-Kitts-et-Nevis", "Saint-Marin", "Saint-Vincent-et-les-Grenadines", "Sainte-Lucie", "Salomon", "Salvador", "Samoa", "São Tomé-et-Principe", "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie", 
  "Tadjikistan", "Tanzanie", "Tchad", "Tchéquie", "Thaïlande", "Timor oriental", "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu", 
  "Ukraine", "Uruguay", 
  "Vanuatu", "Vatican", "Venezuela", "Viêt Nam", 
  "Yémen", 
  "Zambie", "Zimbabwe"
];

export const countriesApi = {
  getCountries: async () => {
    try {
      // Trying API first
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,translations', { signal: AbortSignal.timeout(3000) });
      if (!response.ok) throw new Error('Failed to fetch countries');
      const data = await response.json();
      
      const formattedCountries = data.map(country => {
        return country.translations?.fra?.common || country.name.common;
      }).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
      
      return formattedCountries;
    } catch (error) {
      console.warn("API unavailable, using local exhaustive list", error);
      return LOCAL_COUNTRIES_FR;
    }
  }
};
