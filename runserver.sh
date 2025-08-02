#!/bin/bash

# Carga las variables del fichero .env si existe
if [ -f .env ]; then
  # `set -a` exporta automáticamente las variables para que estén disponibles en los subprocesos
  set -a
  source .env
  set +a
fi

# Usa las variables. Añadimos un valor por defecto con :-
# por si el .env no existiera.
PHPORT=${PHP_PORT:-8080}
XDEBUGPORT=${XDEBUG_PORT:-9005}

echo "Iniciando servidor PHP en el puerto $PHPORT..."
echo "Xdebug escuchando en el puerto $XDEBUGPORT..."

php -dxdebug.mode=debug -dxdebug.client_port=$XDEBUGPORT -dxdebug.start_with_request=yes -S localhost:$PHPORT -t public_html dev_router.php