function f(r,e=!0){if(typeof r!="number"||isNaN(r))return"—";const t=new Intl.NumberFormat("vi-VN").format(r);return e?`${t}đ`:t}export{f};
