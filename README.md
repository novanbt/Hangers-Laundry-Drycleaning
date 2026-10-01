# Hangers Laundry & Dry Cleaning

Modern, responsive web platform for **Hangers Laundry & Dry Cleaning** featuring:
- Hero, Service showcase, and Pricing structures
- Interactive Pickup Request form with nearby East Delhi outlet address selector
- Verified Google Maps reviews and customer testimonials
- Customer authentication modal (Sign In / Sign Up)
- Direct WhatsApp and Google Maps branch integrations

---

## Deploying to Vercel

You can deploy this project to Vercel using either of the two methods below:

### Method 1: Deploy with Vercel CLI (Fastest)

1. Open PowerShell / Command Prompt in this folder.
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the quick prompts in your terminal:
   - Set up and deploy? **Y**
   - Which scope? **(Select your account)**
   - Link to existing project? **N**
   - Project name? **hangers-laundry** (or press Enter)
   - In which directory is your code located? **./** (press Enter)
4. To deploy to production:
   ```bash
   npx vercel --prod
   ```

---

### Method 2: Deploy via GitHub / GitLab / Bitbucket (Recommended for CI/CD)

1. Initialize a git repository and commit the project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Hangers Laundry"
   ```
2. Push the repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/<your-username>/hangers-laundry.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
4. Import your `hangers-laundry` repository.
5. Vercel automatically detects the static configuration via `vercel.json` and `index.html`.
6. Click **Deploy**.

---

## Local Development

To run the site locally:
```bash
npm start
```
Then visit `http://localhost:8080` in your browser.
