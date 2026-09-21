export const unyo = `
// Source: https://www.shadertoy.com/view/MX2BWR
// 球の距離関数
float sphereSDF(vec3 p, float radius) {
    return length(p) - radius;
}

// 立方体の距離関数
float boxSDF(vec3 p, vec3 size) {
    vec3 d = abs(p) - size;
    float outsideDistance = length(max(d, 0.0));
    float insideDistance = min(max(d.x, max(d.y, d.z)), 0.0);
    return outsideDistance + insideDistance;
}

// スムーズな最小値を計算する関数
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float sceneSDF(vec3 p) {
    float time = iTime;
    float d = 100.0;

    // 球の数を定義
    int numSpheres = 20;

    // 複数の球を生成して結合するためのループ
    for (int i = 0; i < numSpheres; i++) {
        float angle = float(i) * 1.1 + time;
        vec3 spherePos = vec3(sin(angle), cos(angle * 1.5), sin(angle * 0.7));

        // 半径を変える
        float radius = 0.4 + 0.1 * float(i % 3);  // 球の半径を少し変化させる

        // 結合
        float dSphere = sphereSDF(p - spherePos, radius);
        d = smin(d, dSphere, 0.5);
    }

    return d;  // 最終的なSDFを返す
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // 画面の座標を正規化
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    // カメラの設定
    vec3 cp = vec3(0.0, 0.0, -5.0);  // カメラの位置を近づける
    vec3 target = vec3(0.0, 0.0, 0.0); // 注目するターゲット
    vec3 cd = normalize(target - cp);   // カメラの向き
    vec3 cs = normalize(cross(cd, vec3(0.0, 1.0, 0.0)));  // カメラの右方向
    vec3 cu = normalize(cross(cs, cd)); // カメラの上方向

    // レイの方向
    vec3 rd = normalize(cs * uv.x + cu * uv.y + cd);  // 視野角調整

    // レイマーチングのループ
    float t = 0.0;
    float maxDistance = 100.0;
    int maxSteps = 100;
    float d;
    for (int i = 0; i < maxSteps; i++) {
        vec3 p = cp + t * rd;  // 現在のレイの位置
        d = sceneSDF(p);       // 距離を計算
        if (d < 0.001) break;  // 十分近づいたら終了
        t += d;                // レイを進める
        if (t > maxDistance) break;  // 最大距離を超えたら終了
    }

    // ヒットしたかどうかで色を決定
    vec3 color;
    if (t < maxDistance) {
        // オブジェクトがヒットしたらカラフルな色にする
        float r = 0.5 + 0.5 * sin(iTime + t);
        float g = 0.5 + 0.5 * cos(iTime + t * 1.3);
        float b = 0.5 + 0.5 * sin(iTime + t * 2.0);
        color = vec3(r, g, b);  // カラフルな色
    } else {
        color = vec3(0.0);  // ヒットしなかったら黒色
    }

    // 最終的なフラグメントの色を設定
    fragColor = vec4(color, 1.0);
}

`
