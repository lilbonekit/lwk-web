FROM rust:1.93-bookworm AS lwk-builder

ARG LWK_REF=jade-serial-improvements
ARG LWK_COMMIT=31fdeca963816a3c83e431b2240802183d78a9ec

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    pkg-config \
    libssl-dev \
    ca-certificates \
    clang \
    && rm -rf /var/lib/apt/lists/*

RUN rustup target add wasm32-unknown-unknown

RUN cargo install wasm-pack --locked

RUN git clone \
    --filter=blob:none \
    --branch "${LWK_REF}" \
    https://github.com/lilbonekit/lwk.git \
    /tmp/lwk \
    && git -C /tmp/lwk checkout --detach "${LWK_COMMIT}" \
    && test "$(git -C /tmp/lwk rev-parse HEAD)" = "${LWK_COMMIT}"

WORKDIR /tmp/lwk/lwk_wasm

RUN RUSTFLAGS='--cfg web_sys_unstable_apis' \
    wasm-pack build \
    --target web \
    --out-dir pkg_web \
    --features simplicity,serial