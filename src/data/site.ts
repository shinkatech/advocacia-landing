import {
  Award,
  Baby,
  Building,
  Globe,
  Laptop,
  Rocket,
  Briefcase,
  Building2,
  CalendarCheck,
  FileSearch,
  Handshake,
  HeartHandshake,
  House,
  Landmark,
  MessageCircle,
  Receipt,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Siren,
  type LucideIcon,
} from 'lucide-react'

/* =========================================================
   EDITE AQUI: todas as informações do escritório ficam neste
   arquivo. Troque nomes, telefone, endereço e textos.
   ========================================================= */

export const firm = {
  name: 'Monteiro & Vasconcelos',
  suffix: 'Advocacia',
  oab: 'OAB/SP nº 00.000',
  founded: 2004,
  phoneDisplay: '(11) 99999-9999',
  whatsapp: '5511999999999', // só números, com DDI 55 + DDD
  email: 'contato@monteirovasconcelos.adv.br',
  address: 'Av. Paulista, 1000 — Conj. 1201, Bela Vista, São Paulo/SP',
  hours: 'Seg a Sex, das 8h às 18h',
  instagram: 'https://instagram.com/',
  linkedin: 'https://linkedin.com/',
}

export const whatsappLink = (text = 'Olá! Gostaria de agendar uma consulta.') =>
  `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(text)}`

export const nav = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'O Escritório' },
  { id: 'areas', label: 'Áreas' },
  { id: 'historia', label: 'História' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'faq', label: 'Dúvidas' },
  { id: 'contato', label: 'Contato' },
]

export const heroWords = [
  'Direito Civil',
  'Direito de Família',
  'Direito Trabalhista',
  'Direito Empresarial',
  'Direito Previdenciário',
  'Direito do Consumidor',
]

export type Area = { icon: LucideIcon; title: string; text: string; tags: string[] }

export const areas: Area[] = [
  {
    icon: Scale,
    title: 'Direito Civil',
    text: 'Contratos, indenizações, responsabilidade civil e cobranças conduzidos com estratégia e clareza.',
    tags: ['Contratos', 'Indenizações', 'Cobranças'],
  },
  {
    icon: HeartHandshake,
    title: 'Família e Sucessões',
    text: 'Divórcio, guarda, pensão, inventário e planejamento sucessório com sensibilidade e sigilo.',
    tags: ['Divórcio', 'Inventário', 'Guarda'],
  },
  {
    icon: Briefcase,
    title: 'Direito Trabalhista',
    text: 'Orientação a empregados e empresas em rescisões, verbas, acordos e reclamações trabalhistas.',
    tags: ['Rescisão', 'Horas extras', 'Acordos'],
  },
  {
    icon: Building2,
    title: 'Direito Empresarial',
    text: 'Abertura de empresas, contratos societários, recuperação de crédito e consultoria preventiva.',
    tags: ['Societário', 'Contratos', 'Compliance'],
  },
  {
    icon: Landmark,
    title: 'Direito Previdenciário',
    text: 'Aposentadorias, revisões, auxílios e BPC/LOAS, com análise completa do seu histórico.',
    tags: ['Aposentadoria', 'Revisão', 'BPC/LOAS'],
  },
  {
    icon: ShoppingBag,
    title: 'Direito do Consumidor',
    text: 'Cobranças indevidas, negativação, problemas com bancos, companhias aéreas e planos de saúde.',
    tags: ['Bancos', 'Voos', 'Planos de saúde'],
  },
  {
    icon: Receipt,
    title: 'Direito Tributário',
    text: 'Planejamento tributário, defesas em execuções fiscais e recuperação de tributos pagos a maior.',
    tags: ['Planejamento', 'Defesa fiscal', 'Restituição'],
  },
  {
    icon: House,
    title: 'Direito Imobiliário',
    text: 'Compra e venda, usucapião, locação, distratos e regularização de imóveis com segurança.',
    tags: ['Usucapião', 'Locação', 'Regularização'],
  },
  {
    icon: Siren,
    title: 'Direito Criminal',
    text: 'Defesa técnica em todas as fases, do inquérito ao julgamento, com atuação ágil e discreta.',
    tags: ['Defesa', 'Inquérito', 'Habeas corpus'],
  },
]

export const marqueeItems = [
  'Ética',
  'Direito Civil',
  'Família',
  'Sigilo',
  'Trabalhista',
  'Empresarial',
  'Transparência',
  'Previdenciário',
  'Consumidor',
  'Compromisso',
  'Tributário',
  'Imobiliário',
]

export type Step = { icon: LucideIcon; title: string; text: string }

export const steps: Step[] = [
  {
    icon: MessageCircle,
    title: 'Primeiro contato',
    text: 'Você nos chama pelo WhatsApp, telefone ou formulário e conta brevemente a sua situação.',
  },
  {
    icon: FileSearch,
    title: 'Análise do caso',
    text: 'Estudamos os documentos e a legislação aplicável para entender os caminhos possíveis.',
  },
  {
    icon: CalendarCheck,
    title: 'Reunião de estratégia',
    text: 'Explicamos, em linguagem simples, as opções, os riscos e os próximos passos.',
  },
  {
    icon: ShieldCheck,
    title: 'Atuação e acompanhamento',
    text: 'Conduzimos o caso e mantemos você informado em cada movimentação importante.',
  },
]

export type Member = { name: string; role: string; oab: string; initials: string; bio: string; areas: string[] }

export const team: Member[] = [
  {
    name: 'Dr. Ricardo Monteiro',
    role: 'Sócio-fundador',
    oab: 'OAB/SP 000.001',
    initials: 'RM',
    bio: 'Mais de 20 anos de atuação em Direito Civil e Empresarial. Especialista em contratos e responsabilidade civil.',
    areas: ['Civil', 'Empresarial'],
  },
  {
    name: 'Dra. Helena Vasconcelos',
    role: 'Sócia',
    oab: 'OAB/SP 000.002',
    initials: 'HV',
    bio: 'Referência em Direito de Família e Sucessões, com atuação humanizada em divórcios, guarda e inventários.',
    areas: ['Família', 'Sucessões'],
  },
  {
    name: 'Dr. André Lacerda',
    role: 'Advogado associado',
    oab: 'OAB/SP 000.003',
    initials: 'AL',
    bio: 'Atua em Direito Trabalhista e Previdenciário, com foco em aposentadorias, revisões e rescisões.',
    areas: ['Trabalhista', 'Previdenciário'],
  },
]

export const values = [
  {
    icon: ShieldCheck,
    title: 'Sigilo absoluto',
    text: 'Suas informações são tratadas com total confidencialidade, como exige o Código de Ética da OAB.',
  },
  {
    icon: Handshake,
    title: 'Atendimento humano',
    text: 'Você fala com advogados, não com robôs. Cada caso é ouvido com atenção e respeito.',
  },
  {
    icon: MessageCircle,
    title: 'Comunicação clara',
    text: 'Nada de "juridiquês". Explicamos cada etapa para que você entenda e decida com segurança.',
  },
  {
    icon: Baby,
    title: 'Olhar para famílias',
    text: 'Casos que envolvem filhos e patrimônio familiar recebem cuidado redobrado.',
  },
]

export const faq = [
  {
    q: 'Como funciona a primeira consulta?',
    a: 'Você entra em contato, agendamos um horário (presencial ou online) e ouvimos a sua situação. Depois explicamos os caminhos possíveis e, se fizer sentido, apresentamos uma proposta de honorários por escrito.',
  },
  {
    q: 'Vocês atendem online?',
    a: 'Sim. Atendemos clientes de todo o Brasil por videochamada e WhatsApp. Documentos podem ser enviados digitalmente e assinados eletronicamente.',
  },
  {
    q: 'Quais documentos devo levar?',
    a: 'Documento de identidade, CPF, comprovante de residência e tudo o que estiver relacionado ao caso: contratos, mensagens, notificações, holerites ou decisões anteriores.',
  },
  {
    q: 'Quanto tempo demora um processo?',
    a: 'Depende do tipo de ação, da comarca e da complexidade do caso. Na reunião de estratégia apresentamos uma estimativa realista, sem promessas, e mantemos você informado durante todo o andamento.',
  },
  {
    q: 'Como são definidos os honorários?',
    a: 'Os honorários seguem a Tabela da OAB e são definidos conforme a complexidade do caso. Tudo é combinado previamente em contrato, com total transparência.',
  },
  {
    q: 'Minhas informações ficam em sigilo?',
    a: 'Sempre. O sigilo profissional é um dever do advogado previsto no Estatuto da Advocacia. Nada do que você nos contar será compartilhado sem sua autorização.',
  },
]

export const stats = [
  { value: 3, suffix: '', label: 'advogados especialistas' },
  { value: 9, suffix: '', label: 'áreas de atuação' },
  { value: 27, suffix: '', label: 'UFs atendidas online' },
  { value: 24, suffix: 'h', label: 'para retorno do contato' },
]

export type Milestone = { year: string; title: string; text: string; icon: LucideIcon }

// Linha do tempo (seção "Nossa História"). Troque pelos fatos reais do escritório.
export const history: Milestone[] = [
  {
    year: '2004',
    title: 'A fundação',
    text: 'O escritório nasce em uma pequena sala no centro de São Paulo, com foco em Direito Civil.',
    icon: Rocket,
  },
  {
    year: '2009',
    title: 'Nova sede',
    text: 'Mudança para a Av. Paulista e chegada da área de Família e Sucessões.',
    icon: Building,
  },
  {
    year: '2014',
    title: 'Novas especialidades',
    text: 'Criação dos núcleos Trabalhista, Previdenciário e Empresarial.',
    icon: Award,
  },
  {
    year: '2019',
    title: 'Escritório digital',
    text: 'Processos 100% eletrônicos, assinatura digital e acompanhamento em tempo real.',
    icon: Laptop,
  },
  {
    year: '2020',
    title: 'Brasil inteiro',
    text: 'Atendimento online por videochamada para clientes de todos os estados.',
    icon: Globe,
  },
  {
    year: 'Hoje',
    title: 'Nove áreas de atuação',
    text: 'Uma equipe completa, com a mesma proximidade do primeiro dia.',
    icon: Scale,
  },
]

// Artigo 5º da Constituição Federal (texto de lei, domínio público).
export const constitutionQuote =
  'Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade.'
