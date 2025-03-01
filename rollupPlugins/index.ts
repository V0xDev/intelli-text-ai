import { unlink, readdir } from "fs/promises";
import { extname, join } from "path";

export default function (extensions = [".png"]) {
  return {
    name: "delete-files",
    async writeBundle({ dir = "dist" }) {
      await Promise.all(
        (await readdir(dir))
          .filter((file) => extensions.includes(extname(file)))
          .map((file) => unlink(join(dir, file)))
      );
    },
  };
}
