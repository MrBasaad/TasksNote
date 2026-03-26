# استخدام Node 24 كما طلبت
FROM node:24-slim AS builder

WORKDIR /app

# نسخ ملفات الاعتمادات
COPY package*.json ./
RUN npm install

# نسخ الكود وبناء المشروع (TypeScript to JS)
COPY . .
RUN npm run build

# مرحلة التشغيل لتقليل الحجم
FROM node:24-slim
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
# تثبيت الاعتمادات الأساسية فقط للتشغيل
RUN npm install --omit=dev

# المنفذ الخاص بالـ Backend
EXPOSE 9009

# أمر التشغيل النهائي
CMD ["npm", "run", "lts"]