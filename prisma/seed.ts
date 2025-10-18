import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  try {
    // Limpar tabelas existentes (na ordem correta por causa das FKs)
    console.log("🧹 Limpando tabelas...");
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    // Criar produtos
    console.log("📦 Criando produtos...");
    const products = await prisma.product.createMany({
      data: [
        {
          name: "Notebook Gamer",
          description: "Notebook para jogos de alta performance",
          price: 4500.0,
          stock: 10,
        },
        {
          name: "Smartphone Android",
          description: "Smartphone com câmera de 48MP",
          price: 1200.0,
          stock: 25,
        },
        {
          name: "Fone Bluetooth",
          description: "Fone de ouvido sem fio com cancelamento de ruído",
          price: 350.0,
          stock: 3,
        },
      ],
    });

    console.log("✅ Produtos criados!");

    // Buscar os produtos criados para usar nos pedidos
    const notebook = await prisma.product.findFirst({
      where: { name: "Notebook Gamer" },
    });
    const smartphone = await prisma.product.findFirst({
      where: { name: "Smartphone Android" },
    });
    const fone = await prisma.product.findFirst({
      where: { name: "Fone Bluetooth" },
    });

    if (!notebook || !smartphone || !fone) {
      throw new Error("❌ Produtos não encontrados!");
    }

    console.log("📋 Criando pedidos...");

    // Criar pedido 1
    const order1 = await prisma.order.create({
      data: {
        customer: "João Silva",
        email: "joao@email.com",
        status: "completed",
        total: 5700.0,
        items: {
          create: [
            {
              productId: notebook.id,
              quantity: 1,
              price: 4500.0,
            },
            {
              productId: smartphone.id,
              quantity: 1,
              price: 1200.0,
            },
          ],
        },
      },
    });

    // Criar pedido 2
    const order2 = await prisma.order.create({
      data: {
        customer: "Maria Santos",
        email: "maria@email.com",
        status: "pending",
        total: 350.0,
        items: {
          create: [
            {
              productId: fone.id,
              quantity: 1,
              price: 350.0,
            },
          ],
        },
      },
    });

    console.log("✅ Pedidos criados!");

    // Verificar contagem final
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const orderItemCount = await prisma.orderItem.count();

    console.log("📊 Resumo:");
    console.log(`   📦 Produtos: ${productCount}`);
    console.log(`   📋 Pedidos: ${orderCount}`);
    console.log(`   🛒 Itens de pedido: ${orderItemCount}`);
    console.log("🎉 Seed completado com sucesso!");
  } catch (error) {
    console.error("❌ Erro no seed:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
