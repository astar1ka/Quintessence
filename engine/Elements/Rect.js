class Rect{

    static intersection(A,B){
        const result = {};
        const endXA = A.x + A.width;
        const endXB = B.x + B.width;
        result.x = (A.x >= B.x) ? A.x : B.x;
        if (result.x >= endXA || result.x >= endXB) return null;
        result.width = (endXA <= endXB) ? endXA - result.x : endXB - result.x;
        const endYA = A.y + A.height;
        const endYB = B.y + B.height;
        result.y = (A.y >= B.y) ? A.y : B.y;
        if (result.y >= endYA || result.y >= endYB) return null;
        result.width = (endYA <= endYB) ? endYA - result.y : endYB - result.y;
        return result;
    }

    static union(){
        
    }
}
