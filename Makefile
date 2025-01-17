.PHONY: migration
make migration:
	@npx prisma migrate dev --name ${name}

.PHONY: dev
make dev:
	pnpm run dev