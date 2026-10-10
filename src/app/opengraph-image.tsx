
import { ImageResponse } from "next/og";

export const alt = "Full-Stack Developer Portfolio";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background: "#111827",
                    color: "#ffffff",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        fontSize: 24,
                        color: "#9ca3af",
                        letterSpacing: "8px",
                    }}
                >
                    PORTFOLIO
                </div>

                <div
                    style={{
                        marginTop: 32,
                        fontSize: 64,
                        fontWeight: 700,
                        lineHeight: 1.15,
                    }}
                >
                    Julette Anthony C. Peque
                </div>

                <div
                    style={{
                        marginTop: 24,
                        fontSize: 30,
                        color: "#d1d5db",
                    }}
                >
                    Full-Stack Developer
                </div>

                <div
                    style={{
                        marginTop: 48,
                        fontSize: 20,
                        color: "#9ca3af",
                    }}
                >
                    Building software, solving problems, shipping products.
                </div>
            </div>
        ),
        size
    );
}
