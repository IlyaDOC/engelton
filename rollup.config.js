export default {
    output: {
        manualChunks(id) {
            if (id.includes("node_modules")) {
                return "vendor";
            }
        },
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].min.js",
        assetFileNames: "assets/css/[name].min.[ext]"
    }
};
