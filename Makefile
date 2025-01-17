.PHONY: migration
migration:
	@npx prisma migrate dev --name ${name}

.PHONY: dev
dev:
	pnpm run dev


.PHONY: prettier-fix
prettier-fix:
	pnpm run prettier-fix

.PHONY=help
help: ## Show this help
	@LC_ALL=C $(MAKE) -pRrq -f $(firstword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | grep -E -v -e '^[^[:alnum:]]' -e '^$@$$'

.DEFAULT_GOAL=help
