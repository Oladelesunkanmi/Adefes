const config = {
    // Uses VITE_API_URL from .env if present (e.g. for local dev if backend is separate)
    // Defaults to empty string (so it uses relative /api paths like the deployed site intends)
    API_BASE_URL: import.meta.env.VITE_API_URL || ''
};

export default config;
