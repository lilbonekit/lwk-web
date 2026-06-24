# lwk-web

> Generated artifacts. Do not edit manually.

Prebuilt LWK WASM package.

## Update from LWK fork

Build artifacts from a specific branch and commit:

```bash
./update.sh jade-serial-improvements 31fdeca963816a3c83e431b2240802183d78a9ec
```

Commit and push updated artifacts:

```bash
git add .

git commit -m "lwk: 31fdeca"

git push
```

## Usage

```json
{
	"dependencies": {
		"@lilbonekit/lwk-web": "github:lilbonekit/lwk-web"
	}
}
```

Install:

```bash
pnpm install
```

## Update in downstream projects

Refresh dependency:

```bash
pnpm update @lilbonekit/lwk-web
```

or reinstall dependencies:

```bash
rm -rf node_modules

pnpm install
```
