-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "agency_number" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_account_number_key" ON "accounts"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_fk_id_user_key" ON "accounts"("fk_id_user");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
