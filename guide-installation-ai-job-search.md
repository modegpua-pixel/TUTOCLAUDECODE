# Installer ai-job-search sur votre PC (guide débutant)

Ce guide installe https://github.com/ai-job-search-dev/ai-job-search dans un dossier `ai-job-search`, avec un dépôt GitHub **privé** à votre nom et le dépôt d'origine en `upstream`.

Il est écrit pour **Windows 10/11** (PowerShell). Les équivalents Mac sont à la fin.
Je n'ai pas pu lire le dépôt d'origine depuis cette session. Les noms exacts des workflows (CI, upstream-watch) sont donc à vérifier à l'étape 5.

Chaque bloc se copie-colle dans **PowerShell**. Après chaque installation, **fermez et rouvrez PowerShell** pour que les commandes soient reconnues.

---

## 1. Installer les outils de base

```powershell
winget install --id Git.Git -e
winget install --id GitHub.cli -e
winget install --id Python.Python.3.12 -e
```

Fermez/rouvrez PowerShell, puis vérifiez :

```powershell
git --version
gh --version
py -3 --version
```

Python doit afficher 3.10 ou plus. Sous Windows, `python3` peut ouvrir le Microsoft Store. Utilisez `py -3` ou `python`. Si l'outil exige absolument `python3`, désactivez l'alias dans Paramètres > Applications > Paramètres avancés > Alias d'exécution d'application.

## 2. Installer Bun, LaTeX et pypdf

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
winget install --id MiKTeX.MiKTeX -e
py -3 -m pip install pypdf
```

Fermez/rouvrez PowerShell, puis vérifiez :

```powershell
bun --version
lualatex --version
xelatex --version
py -3 -c "import pypdf; print(pypdf.__version__)"
```

MiKTeX installe `lualatex` et `xelatex`. Au premier lancement, il peut proposer d'installer des paquets à la volée. Acceptez (« Always install missing packages on-the-fly »).

## 3. Se connecter à GitHub

```powershell
gh auth login
```

Choisissez : GitHub.com, HTTPS, « Login with a web browser ». Suivez les instructions dans le navigateur.

## 4. Cloner, créer le dépôt PRIVÉ, brancher upstream

Placez-vous où vous voulez le dossier (ex. Documents), puis :

```powershell
cd $HOME\Documents
git clone https://github.com/ai-job-search-dev/ai-job-search.git ai-job-search
cd ai-job-search
git remote rename origin upstream
gh repo create ai-job-search --private --source=. --remote=origin --push
```

Ce que cela fait :
- `upstream` pointe vers le dépôt original.
- `origin` pointe vers **votre** dépôt, créé en **privé** (pas un fork public).

Sécurité pour votre CV : empêchez tout envoi accidentel vers le dépôt d'origine.

```powershell
git remote set-url --push upstream DISABLED
git remote -v
```

Vous devez voir `origin` = votre compte, et `upstream` en `fetch` seulement. Vérifiez aussi la confidentialité :

```powershell
gh repo view --json visibility,isFork
```

Attendu : `"visibility":"PRIVATE"` et `"isFork":false`.

Pour récupérer plus tard les mises à jour du projet :

```powershell
git fetch upstream
git merge upstream/main
```

(la branche peut s'appeler `master` ; `git branch -a` le montre).

## 5. Désactiver le workflow CI, garder upstream-watch

```powershell
gh workflow list --all
```

Repérez le nom exact du workflow de CI (par ex. `CI`) et celui de `upstream-watch`. Puis :

```powershell
gh workflow disable "CI"
gh workflow list --all
```

Remplacez `"CI"` par le nom réellement affiché. Si plusieurs workflows relèvent de la CI, désactivez chacun. **Ne désactivez pas** `upstream-watch`, il doit rester `active`.

Choix délibéré : on **désactive** au lieu de supprimer le fichier. Les futures fusions depuis upstream n'auront ainsi pas de conflit sur `.github/workflows/`.

Si GitHub demande d'activer les Actions sur votre dépôt (onglet Actions), faites-le : `upstream-watch` en a besoin.

## 6. Lancer l'installation des CLI de portails

```powershell
py -3 tools/install_portal_clis.py
```

Si le projet exige la commande `python3`, utilisez `python3 tools/install_portal_clis.py` une fois l'alias réglé (étape 1). Si une erreur apparaît, copiez-la-moi tel quel.

## 7. Vérification finale

```powershell
git status
git remote -v
gh workflow list --all
```

Tout est bon si : dépôt privé, `upstream` en lecture seule, CI `disabled`, `upstream-watch` `active`, scripts sans erreur.

---

## Équivalents Mac (Terminal, avec Homebrew)

```bash
brew install git gh python@3.12 oven-sh/bun/bun pypdf
brew install --cask mactex-no-gui
```

(`mactex-no-gui` inclut `lualatex` et `xelatex`. Si `pypdf` n'est pas trouvé par brew : `python3 -m pip install pypdf`.) Les étapes 3 à 7 sont identiques, avec `python3` et des chemins en `/`.

---

## Pour que je fasse tout à votre place

Installez Claude Code sur votre PC, ouvrez le dossier voulu et demandez-lui de suivre ce guide. Il aura accès à votre machine, ce qui n'est pas mon cas dans cette session cloud.
