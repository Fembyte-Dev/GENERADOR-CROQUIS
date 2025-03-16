document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generateBtn');
    const printBtn = document.getElementById('printBtn');
    const output = document.getElementById('output');
    const marginSlider = document.getElementById('marginSize');
    const marginValue = document.getElementById('marginValue');

    // Generar el croquis automáticamente al cargar la página
    generateCroquis();

    // Función de debounce para limitar la frecuencia de actualización
    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    }

    // Versión con debounce de generateCroquis para mejorar rendimiento
    const debouncedGenerateCroquis = debounce(generateCroquis, 100);

    // Actualizar el valor del margen cuando se mueve el slider
    marginSlider.addEventListener('input', function () {
        marginValue.textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });

    // Actualizar valores de los offsets cuando se mueven los sliders
    document.getElementById('northMeasureOffset').addEventListener('input', function () {
        document.getElementById('northMeasureOffsetValue').textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });
    document.getElementById('northNeighborOffset').addEventListener('input', function () {
        document.getElementById('northNeighborOffsetValue').textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });
    document.getElementById('southMeasureOffset').addEventListener('input', function () {
        document.getElementById('southMeasureOffsetValue').textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });
    document.getElementById('southNeighborOffset').addEventListener('input', function () {
        document.getElementById('southNeighborOffsetValue').textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });
    document.getElementById('eastMeasureOffset').addEventListener('input', function () {
        document.getElementById('eastMeasureOffsetValue').textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });
    document.getElementById('eastNeighborOffset').addEventListener('input', function () {
        document.getElementById('eastNeighborOffsetValue').textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });
    document.getElementById('westMeasureOffset').addEventListener('input', function () {
        document.getElementById('westMeasureOffsetValue').textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });
    document.getElementById('westNeighborOffset').addEventListener('input', function () {
        document.getElementById('westNeighborOffsetValue').textContent = this.value;
        debouncedGenerateCroquis(); // Actualizar croquis con debounce
    });

    // Añadir event listeners para actualización automática en los inputs de medidas y colindancias
    document.getElementById('title').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('northMeasure').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('southMeasure').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('eastMeasure').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('westMeasure').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('northNeighbor').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('southNeighbor').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('eastNeighbor').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('westNeighbor').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('northColor').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('southColor').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('eastColor').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('westColor').addEventListener('input', debouncedGenerateCroquis);
    document.getElementById('showMeasures').addEventListener('change', debouncedGenerateCroquis);
    document.getElementById('showNeighbors').addEventListener('change', debouncedGenerateCroquis);

    generateBtn.addEventListener('click', generateCroquis);
    printBtn.addEventListener('click', function () {
        window.print();
    });

    // Función optimizada para generar el croquis
    function generateCroquis() {
        // Mostrar sección de salida
        output.classList.remove('hidden');

        // Obtener valores usando destructuring para mayor legibilidad
        const title = document.getElementById('title').value;

        // Medidas
        const northMeasure = parseFloat(document.getElementById('northMeasure').value);
        const southMeasure = parseFloat(document.getElementById('southMeasure').value);
        const eastMeasure = parseFloat(document.getElementById('eastMeasure').value);
        const westMeasure = parseFloat(document.getElementById('westMeasure').value);

        // Colindancias
        const northNeighbor = document.getElementById('northNeighbor').value;
        const southNeighbor = document.getElementById('southNeighbor').value;
        const eastNeighbor = document.getElementById('eastNeighbor').value;
        const westNeighbor = document.getElementById('westNeighbor').value;

        // Colores
        const northColor = document.getElementById('northColor').value;
        const southColor = document.getElementById('southColor').value;
        const eastColor = document.getElementById('eastColor').value;
        const westColor = document.getElementById('westColor').value;

        // Configuración
        const marginSize = parseInt(document.getElementById('marginSize').value);

        // Offsets para textos
        const northMeasureOffset = parseInt(document.getElementById('northMeasureOffset').value);
        const northNeighborOffset = parseInt(document.getElementById('northNeighborOffset').value);
        const southMeasureOffset = parseInt(document.getElementById('southMeasureOffset').value);
        const southNeighborOffset = parseInt(document.getElementById('southNeighborOffset').value);
        const eastMeasureOffset = parseInt(document.getElementById('eastMeasureOffset').value);
        const eastNeighborOffset = parseInt(document.getElementById('eastNeighborOffset').value);
        const westMeasureOffset = parseInt(document.getElementById('westMeasureOffset').value);
        const westNeighborOffset = parseInt(document.getElementById('westNeighborOffset').value);

        // Actualizar título
        document.getElementById('outputTitle').textContent = title;

        // Generar tabla de datos
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        const rows = [
            { orientation: 'NORTE', measure: northMeasure.toFixed(2), neighbor: northNeighbor },
            { orientation: 'SUR', measure: southMeasure.toFixed(2), neighbor: southNeighbor },
            { orientation: 'ORIENTE', measure: eastMeasure.toFixed(2), neighbor: eastNeighbor },
            { orientation: 'PONIENTE', measure: westMeasure.toFixed(2), neighbor: westNeighbor }
        ];

        rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.orientation}</td>
                <td>${row.measure} mts.</td>
                <td>${row.neighbor}</td>
            `;
            tableBody.appendChild(tr);
        });

        // Generar leyenda
        const legendContainer = document.getElementById('legendContainer');
        legendContainer.innerHTML = '<h3>Colindancias:</h3>';

        const references = [
            { color: northColor, text: `NORTE: ${northMeasure.toFixed(2)} mts. con ${northNeighbor}` },
            { color: southColor, text: `SUR: ${southMeasure.toFixed(2)} mts. con ${southNeighbor}` },
            { color: eastColor, text: `ORIENTE: ${eastMeasure.toFixed(2)} mts. con ${eastNeighbor}` },
            { color: westColor, text: `PONIENTE: ${westMeasure.toFixed(2)} mts. con ${westNeighbor}` }
        ];

        references.forEach(ref => {
            const div = document.createElement('div');
            div.className = 'reference';
            div.innerHTML = `
                <div class="color-box" style="background-color: ${ref.color};"></div>
                <span>${ref.text}</span>
            `;
            legendContainer.appendChild(div);
        });

        // Calcular y mostrar área
        const area = calculateArea(northMeasure, southMeasure, eastMeasure, westMeasure);
        document.getElementById('areaInfo').textContent =
            `Superficie aproximada: ${area.toLocaleString()} m² (Calculada en base a las medidas proporcionadas)`;

        // Dibujar el croquis
        drawCroquis(
            northMeasure, southMeasure, eastMeasure, westMeasure,
            northNeighbor, southNeighbor, eastNeighbor, westNeighbor,
            northColor, southColor, eastColor, westColor,
            marginSize,
            northMeasureOffset, southMeasureOffset, eastMeasureOffset, westMeasureOffset,
            northNeighborOffset, southNeighborOffset, eastNeighborOffset, westNeighborOffset,
            document.getElementById('showMeasures').checked,
            document.getElementById('showNeighbors').checked
        );
    }

    function calculateArea(north, south, east, west) {
        // Usando la fórmula del área del trapecio: A = (b1 + b2) * h / 2
        const height = (east + west) / 2;
        const area = (north + south) * height / 2;
        return Math.round(area);
    }

    function drawCroquis(northSide, southSide, eastSide, westSide,
        northNeighbor, southNeighbor, eastNeighbor, westNeighbor,
        northColor, southColor, eastColor, westColor,
        margin,
        northMeasureOffset, southMeasureOffset, eastMeasureOffset, westMeasureOffset,
        northNeighborOffset, southNeighborOffset, eastNeighborOffset, westNeighborOffset,
        showMeasures, showNeighbors) {
        const canvas = document.getElementById('terrainMap');
        const ctx = canvas.getContext('2d');

        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Definir margen y escala
        const totalWidth = (northSide + southSide) / 2;
        const totalHeight = (eastSide + westSide) / 2;

        const scaleX = (canvas.width - 2 * margin) / totalWidth;
        const scaleY = (canvas.height - 2 * margin) / totalHeight;
        const scale = Math.min(scaleX, scaleY);

        const startX = (canvas.width - (totalWidth * scale)) / 2;
        const startY = (canvas.height - (totalHeight * scale)) / 2;

        // Puntos del polígono
        const points = [
            { x: startX, y: startY }, // Esquina noroeste
            { x: startX + northSide * scale, y: startY }, // Esquina noreste
            { x: startX + northSide * scale, y: startY + eastSide * scale }, // Esquina sureste
            { x: startX + (northSide - southSide) * scale, y: startY + westSide * scale } // Esquina suroeste
        ];

        // Dibujar el polígono
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.closePath();
        ctx.fillStyle = 'rgba(240, 240, 240, 0.5)';
        ctx.fill();

        // Colores para cada lado
        const colors = [northColor, southColor, eastColor, westColor];

        // Dibujar y etiquetar cada lado
        drawSide(points[0], points[1], northSide, 'NORTE', colors[0], 0, northMeasureOffset, showMeasures);
        drawSide(points[3], points[2], southSide, 'SUR', colors[1], 0, southMeasureOffset, showMeasures);
        drawSide(points[1], points[2], eastSide, 'ORIENTE', colors[2], Math.PI / 2, eastMeasureOffset, showMeasures);
        drawSide(points[0], points[3], westSide, 'PONIENTE', colors[3], Math.PI / 2, westMeasureOffset, showMeasures);

        // Dibujar textos de colindancias
        ctx.font = '12px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';

        // Colindancias
        if (showNeighbors) {
            drawColindancia(points[0], points[1], northNeighbor, northNeighborOffset);
            drawColindancia(points[3], points[2], southNeighbor, southNeighborOffset);
            drawColindancia(points[1], points[2], eastNeighbor, eastNeighborOffset);
            drawColindancia(points[0], points[3], westNeighbor, westNeighborOffset);
        }

        // Dibujar brújula
        drawCompass(canvas.width - 100, 100, 40);

        // Dibujar esquinas con puntos
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#333';
            ctx.fill();
        });

        // Función para dibujar un lado
        function drawSide(start, end, length, orientation, color, angleOffset, textOffset, showMeasures) {
            // Dibujar línea
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.lineWidth = 4;
            ctx.strokeStyle = color;
            ctx.stroke();

            // Dibujar medida solo si showMeasures es true
            if (showMeasures) {
                const midX = (start.x + end.x) / 2;
                const midY = (start.y + end.y) / 2;

                // Calcular ángulo
                let angle = Math.atan2(end.y - start.y, end.x - start.x) + angleOffset;

                // Ajustar posición del texto
                let offsetX = 0;
                let offsetY = 0;

                if (orientation === 'NORTE') {
                    offsetY = textOffset; // Usar el offset personalizado
                } else if (orientation === 'SUR') {
                    offsetY = textOffset; // Usar el offset personalizado
                } else if (orientation === 'ORIENTE') {
                    offsetX = textOffset; // Usar el offset personalizado
                } else if (orientation === 'PONIENTE') {
                    offsetX = textOffset; // Usar el offset personalizado
                }

                // Añadir fondo para el texto
                ctx.save();
                ctx.translate(midX + offsetX, midY + offsetY);

                // Determinar si necesitamos rotar el texto para que sea legible
                let needsRotation = false;
                let rotationAngle = angle;

                if (orientation === 'ORIENTE' || orientation === 'PONIENTE') {
                    // Para lados verticales, siempre rotamos
                    needsRotation = true;

                    // Ajustar el ángulo para que el texto siempre sea legible (de izquierda a derecha)
                    // Si el ángulo está en el rango de -PI a 0 o PI/2 a 3PI/2, invertimos la rotación
                    if ((rotationAngle > -Math.PI && rotationAngle < 0) ||
                        (rotationAngle > Math.PI / 2 && rotationAngle < 3 * Math.PI / 2)) {
                        rotationAngle += Math.PI; // Girar 180 grados
                    }
                }

                if (needsRotation) {
                    ctx.rotate(rotationAngle);
                }

                const textMeasure = `${length.toFixed(2)} m`;
                const metrics = ctx.measureText(textMeasure);
                const padding = 5;

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(
                    -metrics.width / 2 - padding,
                    -15 - padding,
                    metrics.width + padding * 2,
                    20 + padding * 2
                );

                // Dibujar texto
                ctx.font = 'bold 14px Arial';
                ctx.fillStyle = '#333';
                ctx.textAlign = 'center';
                ctx.fillText(textMeasure, 0, 0);
                ctx.restore();
            }

            // Añadir flechas
            drawArrow(start, end, color);
        }

        // Función para dibujar flechas
        function drawArrow(start, end, color) {
            const headLength = 15;
            const headAngle = Math.PI / 6;

            // Calcular ángulo
            const angle = Math.atan2(end.y - start.y, end.x - start.x);

            // Dibujar punta de flecha en el inicio
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(
                start.x + headLength * Math.cos(angle + Math.PI - headAngle),
                start.y + headLength * Math.sin(angle + Math.PI - headAngle)
            );
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(
                start.x + headLength * Math.cos(angle + Math.PI + headAngle),
                start.y + headLength * Math.sin(angle + Math.PI + headAngle)
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.stroke();

            // Dibujar punta de flecha en el final
            ctx.beginPath();
            ctx.moveTo(end.x, end.y);
            ctx.lineTo(
                end.x + headLength * Math.cos(angle - headAngle),
                end.y + headLength * Math.sin(angle - headAngle)
            );
            ctx.moveTo(end.x, end.y);
            ctx.lineTo(
                end.x + headLength * Math.cos(angle + headAngle),
                end.y + headLength * Math.sin(angle + headAngle)
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        // Función para dibujar colindancias
        function drawColindancia(start, end, text, offset) {
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;

            // Calcular ángulo
            const angle = Math.atan2(end.y - start.y, end.x - start.x);

            // Calcular offset perpendicular
            const perpX = -Math.sin(angle) * offset;
            const perpY = Math.cos(angle) * offset;

            // Dibujar fondo para el texto
            ctx.save();
            ctx.translate(midX + perpX, midY + perpY);

            // Rotar texto
            if (Math.abs(angle - Math.PI / 2) < 0.1 || Math.abs(angle + Math.PI / 2) < 0.1) {
                ctx.rotate(angle);
            }

            // Medir texto
            const metrics = ctx.measureText(text);
            const padding = 5;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(
                -metrics.width / 2 - padding,
                -10 - padding,
                metrics.width + padding * 2,
                20 + padding * 2
            );

            // Dibujar texto
            ctx.font = 'italic 12px Arial';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.fillText(text, 0, 0);
            ctx.restore();
        }

        // Función para dibujar la brújula
        function drawCompass(x, y, radius) {
            // Círculo exterior
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#333';
            ctx.stroke();

            // Flecha Norte
            ctx.beginPath();
            ctx.moveTo(x, y - radius + 5);
            ctx.lineTo(x - 8, y);
            ctx.lineTo(x, y + 5);
            ctx.lineTo(x + 8, y);
            ctx.closePath();
            ctx.fillStyle = '#DD3333';
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.stroke();

            // Letras para los puntos cardinales
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('N', x, y - radius / 2);
            ctx.fillText('S', x, y + radius / 2);
            ctx.fillText('E', x + radius / 2, y);
            ctx.fillText('O', x - radius / 2, y);
        }
    }

    // Generar croquis con los valores iniciales
    generateCroquis();
    
    // Actualizar valores de los rangos
    document.querySelectorAll('input[type="range"]').forEach(range => {
        const valueSpan = document.getElementById(range.id + 'Value');
        if (valueSpan) {
            range.addEventListener('input', () => {
                valueSpan.textContent = range.value + ' px';
            });
        }
    });
    
    // Toggle para secciones colapsables en móvil
    document.querySelectorAll('.collapse-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('collapsed');
            const content = toggle.nextElementSibling;
            if (content.classList.contains('collapsed')) {
                content.classList.remove('collapsed');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.classList.add('collapsed');
                content.style.maxHeight = "0";
            }
        });
        
        // Inicialmente expandido
        const content = toggle.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
    });
    
    // Actualizar leyenda
    function updateLegend() {
        const legend = document.getElementById('legendContainer');
        legend.innerHTML = '<h3 class="legend-title">Colindancias:</h3>';
        
        const directions = [
            { name: 'NORTE', color: document.getElementById('northColor').value, neighbor: document.getElementById('northNeighbor').value },
            { name: 'SUR', color: document.getElementById('southColor').value, neighbor: document.getElementById('southNeighbor').value },
            { name: 'ORIENTE', color: document.getElementById('eastColor').value, neighbor: document.getElementById('eastNeighbor').value },
            { name: 'PONIENTE', color: document.getElementById('westColor').value, neighbor: document.getElementById('westNeighbor').value }
        ];
        
        directions.forEach(dir => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            
            const colorBox = document.createElement('span');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = dir.color;
            
            const text = document.createElement('span');
            text.textContent = `${dir.name}: ${dir.neighbor}`;
            
            item.appendChild(colorBox);
            item.appendChild(text);
            legend.appendChild(item);
        });
    }
});