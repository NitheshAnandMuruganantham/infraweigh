BEGIN TRANSACTION;
ALTER TABLE "public"."user" DROP CONSTRAINT "user_pkey";

ALTER TABLE "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id", "email");
COMMIT TRANSACTION;
