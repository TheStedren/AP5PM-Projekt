import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.m1_suk.project",
  appName: "Project",
  webDir: "www",
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;