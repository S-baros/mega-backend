const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const senhaHash = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@soumega.com' },
    update: {},
    create: {
      email: 'admin@soumega.com',
      password: senhaHash,
      name: 'Alexandre',
    },
  })

  const membros = await Promise.all([
    prisma.member.upsert({
      where: { email: 'alexandre@soumega.com' },
      update: {},
      create: { name: 'Alexandre', email: 'alexandre@soumega.com', role: 'Desenvolvedor Back-end' },
    }),
    prisma.member.upsert({
      where: { email: 'geovana@soumega.com' },
      update: {},
      create: { name: 'Geovana', email: 'geovana@soumega.com', role: 'Desenvolvedora Front-end' },
    }),
  ])

  const projeto = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'mega-projeto',
      description: 'Sistema de Gestão de Projetos e Alocação de Membros da Mega Jr.',
      status: 'Ativo',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
    },
  })

  await prisma.allocation.upsert({
    where: { memberId_projectId: { memberId: membros[0].id, projectId: projeto.id } },
    update: {},
    create: { memberId: membros[0].id, projectId: projeto.id, role: 'Dev Back-end', workload: 20 },
  })

  await prisma.allocation.upsert({
    where: { memberId_projectId: { memberId: membros[1].id, projectId: projeto.id } },
    update: {},
    create: { memberId: membros[1].id, projectId: projeto.id, role: 'Dev Front-end', workload: 20 },
  })
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
