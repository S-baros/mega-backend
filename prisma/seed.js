// prisma/seed.js — popula o banco com dados de exemplo
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Usuário admin
  const senhaHash = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@soumega.com' },
    update: {},
    create: {
      email: 'admin@soumega.com',
      password: senhaHash,
      name: 'Administrador',
    },
  })

  // Membros de exemplo
  const membros = await Promise.all([
    prisma.member.upsert({
      where: { email: 'ana@soumega.com' },
      update: {},
      create: { name: 'Ana Silva', email: 'ana@soumega.com', role: 'Desenvolvedora' },
    }),
    prisma.member.upsert({
      where: { email: 'bruno@soumega.com' },
      update: {},
      create: { name: 'Bruno Costa', email: 'bruno@soumega.com', role: 'Designer' },
    }),
    prisma.member.upsert({
      where: { email: 'carla@soumega.com' },
      update: {},
      create: { name: 'Carla Santos', email: 'carla@soumega.com', role: 'Gerente de Projetos' },
    }),
  ])

  // Projetos de exemplo
  const projeto1 = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Website Institucional',
      description: 'Desenvolvimento do novo site da empresa',
      status: 'Ativo',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-06-30'),
    },
  })

  const projeto2 = await prisma.project.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Sistema de Gestão Interna',
      description: 'Plataforma interna para gerenciamento de processos',
      status: 'Planejamento',
      startDate: new Date('2026-03-01'),
    },
  })

  // Alocações de exemplo
  await prisma.allocation.upsert({
    where: { memberId_projectId: { memberId: membros[0].id, projectId: projeto1.id } },
    update: {},
    create: { memberId: membros[0].id, projectId: projeto1.id, role: 'Dev Front-end', workload: 20 },
  })
  await prisma.allocation.upsert({
    where: { memberId_projectId: { memberId: membros[1].id, projectId: projeto1.id } },
    update: {},
    create: { memberId: membros[1].id, projectId: projeto1.id, role: 'Designer', workload: 10 },
  })
  await prisma.allocation.upsert({
    where: { memberId_projectId: { memberId: membros[2].id, projectId: projeto2.id } },
    update: {},
    create: { memberId: membros[2].id, projectId: projeto2.id, role: 'Líder', workload: 15 },
  })

  console.log('✅ Seed concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
