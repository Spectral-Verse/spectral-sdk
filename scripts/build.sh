#!/bin/bash
set -e
echo "Building Spectra SDK..."
npm run clean
npm run build
echo "Build complete."
