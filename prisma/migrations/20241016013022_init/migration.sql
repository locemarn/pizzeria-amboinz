-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "ingredient" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pizzas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "Pizzas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "pizzasId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredients_ingredient_key" ON "Ingredients"("ingredient");

-- CreateIndex
CREATE UNIQUE INDEX "Pizzas_name_key" ON "Pizzas"("name");

-- AddForeignKey
ALTER TABLE "Pizzas" ADD CONSTRAINT "Pizzas_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_pizzasId_fkey" FOREIGN KEY ("pizzasId") REFERENCES "Pizzas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
