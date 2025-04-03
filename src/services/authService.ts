
class AuthService {
  private ADMIN_KEY = 'atelier_unique_admin_code';
  private STORAGE_KEY = 'atelier_unique_admin_auth';
  
  private adminCode = 'admin123'; // Hardcoded admin code for simplicity
  
  // Check if the user is authenticated
  isAuthenticated(): boolean {
    try {
      const storedAuth = localStorage.getItem(this.STORAGE_KEY);
      return storedAuth === 'true';
    } catch (error) {
      // In case localStorage is not available (private browsing mode, etc.)
      console.error("Error accessing localStorage:", error);
      return false;
    }
  }
  
  // Log in with an admin code
  login(code: string): boolean {
    if (code === this.adminCode) {
      try {
        localStorage.setItem(this.STORAGE_KEY, 'true');
        return true;
      } catch (error) {
        console.error("Error writing to localStorage:", error);
        return false;
      }
    }
    return false;
  }
  
  // Log out
  logout(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }
}

export const authService = new AuthService();
