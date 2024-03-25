.PHONY: migration
make migration:
	@npx prisma migrate dev --name ${name}
