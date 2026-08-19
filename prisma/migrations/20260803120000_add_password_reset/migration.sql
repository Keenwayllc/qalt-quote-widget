-- Additive: self-serve password reset.
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "passwordResetToken" TEXT;
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "passwordResetExpires" TIMESTAMP(3);
CREATE UNIQUE INDEX IF NOT EXISTS "Company_passwordResetToken_key" ON "Company"("passwordResetToken");
