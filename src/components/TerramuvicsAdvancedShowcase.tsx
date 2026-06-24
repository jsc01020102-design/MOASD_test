import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Droplet, 
  Activity, 
  CheckCircle, 
  FlaskConical, 
  ShieldAlert, 
  Search, 
  TrendingUp, 
  Flame, 
  Wind, 
  Layers, 
  Eye
} from 'lucide-react';

interface TerramuvicsAdvancedShowcaseProps {
  language: string;
  isEn: boolean;
}

export const TerramuvicsAdvancedShowcase: React.FC<TerramuvicsAdvancedShowcaseProps> = ({ language, isEn }) => {
  // --- TAB 2: Mineral Water Data ---
  const mineralData = [
    { name: 'Calcium (Ca)', kr: '칼슘 (Ca)', tap: 19.69, ro: 0.17, hollow: 19.87, hanumul: 21.23, sam: 27.00 },
    { name: 'Potassium (K)', kr: '칼륨 (K)', tap: 2.39, ro: 0.17, hollow: 2.43, hanumul: 2.25, sam: 5.60 },
    { name: 'Magnesium (Mg)', kr: '마그네슘 (Mg)', tap: 3.36, ro: 0.00, hollow: 3.37, hanumul: 3.43, sam: 5.25, roDisplay: '불검출' },
    { name: 'Sodium (Na)', kr: '나트륨 (Na)', tap: 6.92, ro: 0.79, hollow: 6.93, hanumul: 7.22, sam: 19.20 }
  ];

  // --- TAB 3: BRS Interpretation Guide Slider State ---
  const [brsSliderVal, setBrsSliderVal] = useState<number>(18);
  const brsGuideLevels = [
    { min: -21, max: -11, krState: '실제로 건강이 최악의 상태로 악화된 상태', enState: 'Critically deteriorated health state', krImpact: '건강에 대단히 해로운 대상임', enImpact: 'Extremely harmful to biological health', color: 'from-red-600 to-rose-700', bg: 'bg-red-950/20 border-red-500/30' },
    { min: -10, max: -6, krState: '건강에 해로운 대상', enState: 'Harmful state to health', krImpact: '건강에 해로운 대상', enImpact: 'Harmful to health', color: 'from-orange-500 to-red-600', bg: 'bg-orange-950/20 border-orange-500/30' },
    { min: -5, max: -1, krState: '건강이 이미 상당히 악화되어 표면적으로 문제가 드러난 상태', enState: 'Moderately deteriorated health, visible symptoms', krImpact: '비록 약할지라도 건강에 해로운 대상임', enImpact: 'Mildly harmful but still detrimental', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-950/20 border-amber-500/30' },
    { min: 0, max: 2, krState: '건강이 악화되고 있지만 표면적으로는 문제가 드러나지 않을 수 있는 상태', enState: 'Silent deterioration without visible symptoms', krImpact: '건강에 아무런 도움이 되지 않는 대상임', enImpact: 'Provides zero biological value or help', color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-950/20 border-yellow-500/30' },
    { min: 3, max: 5, krState: '건강이 많이 약해진 상태지만 이상징후가 거의 드러나지 않는 상태', enState: 'Weakened state, barely showing anomalies', krImpact: '효과가 미약한 대상임', enImpact: 'Extremely weak or negligible efficacy', color: 'from-lime-400 to-yellow-500', bg: 'bg-lime-950/20 border-lime-500/30' },
    { min: 6, max: 9, krState: '건강을 염려할 필요는 없지만 충분히 건강하지는 않은 상태', enState: 'No critical concern but not fully vitalized', krImpact: '건강에 도움이 되는 대상임', enImpact: 'Mildly helpful to health', color: 'from-emerald-400 to-lime-500', bg: 'bg-emerald-950/20 border-emerald-500/30' },
    { min: 10, max: 15, krState: '비교적 건강한 상태로서 건강에 대한 염려를 하지 않아도 좋은 상태', enState: 'Relatively healthy, worry-free physiological state', krImpact: '건강에 상당히 유익한 대상임', enImpact: 'Highly beneficial to biological systems', color: 'from-teal-400 to-emerald-500', bg: 'bg-teal-950/20 border-teal-500/30' },
    { min: 16, max: 21, krState: '해로운 기운이 전혀 없어서 감기조차 잘 걸리지 않는 상태', enState: 'Perfect immune state, extremely resistant to illness', krImpact: '건강에 최고로 좋은 효과가 있는 대상임', enImpact: 'Outstanding supreme therapeutic benefits', color: 'from-cyan-400 to-teal-500', bg: 'bg-cyan-950/20 border-cyan-500/30' }
  ];

  const currentBrsGuide = useMemo(() => {
    return brsGuideLevels.find(g => brsSliderVal >= g.min && brsSliderVal <= g.max) || brsGuideLevels[7];
  }, [brsSliderVal]);

  // --- TAB 4: 30-Parameter BRS Test Analysis Data ---
  const [brsSearch, setBrsSearch] = useState<string>('');
  const [selectedBrsRow, setSelectedBrsRow] = useState<number>(0);

  const brsParameters = [
    { id: 1, code: 'B222', nameKr: '면역기능', nameEn: 'Immune Function', values: [7, 9, 10, 10, 11, 11, 11] },
    { id: 2, code: 'E222', nameKr: '스트레스', nameEn: 'Stress Level', values: [6, 10, 11, 11, 11, 11, 11] },
    { id: 3, code: 'J042', nameKr: '혈액의 순도', nameEn: 'Blood Purity', values: [6, 8, 8, 8, 9, 11, 11] },
    { id: 4, code: 'H094', nameKr: '대사장애', nameEn: 'Metabolic Disorder', values: [3, 6, 10, 10, 12, 12, 12] },
    { id: 5, code: 'D329', nameKr: '머리', nameEn: 'Cranial Activity (Head)', values: [8, 9, 9, 10, 10, 11, 11] },
    { id: 6, code: 'D327', nameKr: '기억력', nameEn: 'Memory Retention', values: [6, 9, 9, 9, 9, 10, 10] },
    { id: 7, code: 'C895', nameKr: '호르몬균형', nameEn: 'Hormone Balance', values: [5, 10, 11, 11, 11, 12, 12] },
    { id: 8, code: 'H013', nameKr: '미네랄밸런스', nameEn: 'Mineral Balance', values: [5, 9, 9, 9, 11, 11, 11] },
    { id: 9, code: 'F543', nameKr: '혈액순환', nameEn: 'Blood Circulation', values: [7, 10, 10, 10, 10, 10, 10] },
    { id: 10, code: 'C536', nameKr: '자율신경계', nameEn: 'Autonomic Nervous System', values: [6, 9, 9, 9, 10, 11, 11] },
    { id: 11, code: 'C419', nameKr: '장관 / 창자', nameEn: 'Intestinal Tract', values: [6, 7, 9, 10, 10, 11, 11] },
    { id: 12, code: 'D544', nameKr: '비장', nameEn: 'Spleen Function', values: [6, 7, 10, 11, 11, 11, 11] },
    { id: 13, code: 'D373', nameKr: '비만', nameEn: 'Obesity Regulation', values: [5, 7, 7, 9, 9, 10, 10] },
    { id: 14, code: 'D684', nameKr: '피로독소', nameEn: 'Fatigue Toxins', values: [6, 6, 8, 10, 10, 10, 10] },
    { id: 15, code: 'D372', nameKr: '염증', nameEn: 'Inflammation Defense', values: [4, 6, 9, 10, 10, 10, 10] },
    { id: 16, code: 'D177', nameKr: '걱정/불안', nameEn: 'Anxiety & Worry Control', values: [6, 8, 8, 8, 10, 10, 10] },
    { id: 17, code: 'F005', nameKr: '암 / 악성신생물', nameEn: 'Oncology / Tumor Resistance', values: [4, 4, 9, 9, 10, 10, 10] },
    { id: 18, code: 'D199', nameKr: '위 / 십이지장', nameEn: 'Gastric & Duodenum', values: [5, 7, 7, 8, 10, 10, 10] },
    { id: 19, code: 'D166', nameKr: '심장', nameEn: 'Cardiac Health (Heart)', values: [7, 7, 7, 7, 9, 10, 10] },
    { id: 20, code: 'F031', nameKr: '초단파방사선', nameEn: 'EMF / Microwave Resistance', values: [7, 8, 9, 10, 10, 11, 12] },
    { id: 21, code: 'D273', nameKr: '간장', nameEn: 'Hepatic (Liver) Vitality', values: [5, 8, 9, 11, 11, 11, 12] },
    { id: 22, code: 'D802', nameKr: '신장', nameEn: 'Renal (Kidney) Efficiency', values: [5, 8, 9, 9, 11, 11, 11] },
    { id: 23, code: 'D996', nameKr: '폐 / 기관지', nameEn: 'Pulmonary / Bronchi', values: [5, 8, 9, 9, 9, 9, 9] },
    { id: 24, code: 'D520', nameKr: '고혈압', nameEn: 'Hypertension Regulation', values: [6, 8, 9, 11, 11, 11, 11] },
    { id: 25, code: 'I009', nameKr: '당뇨병', nameEn: 'Diabetes Glycemic Control', values: [7, 8, 9, 9, 9, 10, 10] },
    { id: 26, code: '36FD', nameKr: '방광', nameEn: 'Bladder Function', values: [5, 6, 7, 9, 9, 10, 10] },
    { id: 27, code: 'J007', nameKr: '피부염', nameEn: 'Dermatitis Mitigation', values: [6, 7, 7, 8, 8, 8, 8] },
    { id: 28, code: 'G383', nameKr: '알러지', nameEn: 'Allergy Resistance', values: [6, 6, 7, 9, 9, 9, 9] },
    { id: 29, code: 'D157', nameKr: '결장 / 대장', nameEn: 'Colon / Bowel Health', values: [6, 7, 9, 9, 10, 10, 11] },
    { id: 30, code: 'D389', nameKr: '긴장', nameEn: 'Muscle & Nerve Tension', values: [6, 7, 8, 9, 9, 10, 11] }
  ];

  const timeLabels = ['음용 전', '3시간 후', '6시간 후', '12시간 후', '24시간 후', '48시간 후', '72시간 후'];
  const timeLabelsEn = ['Before', '3 Hours', '6 Hours', '12 Hours', '24 Hours', '48 Hours', '72 Hours'];

  const filteredBrs = useMemo(() => {
    return brsParameters.filter(p => {
      const q = brsSearch.toLowerCase();
      return p.nameKr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    });
  }, [brsSearch]);

  const activeBrsParam = brsParameters[selectedBrsRow] || brsParameters[0];

  // --- TAB 5: RADIAL BIO-RESONANCE (Crown-TV Diagrams) ---
  const [radialPhase, setRadialPhase] = useState<'before' | '24h' | '48h' | '72h'>('before');

  const getRadarPoints = (phase: 'before' | '24h' | '48h' | '72h', isLeft: boolean) => {
    const center = 100;
    const maxRadius = 75;
    
    let factors = [0.4, 0.45, 0.5, 0.35, 0.4, 0.55, 0.5, 0.45, 0.4, 0.48, 0.52, 0.4];
    if (phase === 'before') {
      factors = isLeft 
        ? [0.35, 0.42, 0.48, 0.3, 0.38, 0.52, 0.45, 0.4, 0.35, 0.45, 0.48, 0.38]
        : [0.38, 0.4, 0.45, 0.35, 0.42, 0.48, 0.4, 0.44, 0.38, 0.42, 0.45, 0.4];
    } else if (phase === '24h') {
      factors = isLeft
        ? [0.65, 0.72, 0.78, 0.6, 0.68, 0.82, 0.75, 0.7, 0.65, 0.75, 0.78, 0.68]
        : [0.68, 0.7, 0.75, 0.65, 0.72, 0.78, 0.7, 0.74, 0.68, 0.72, 0.75, 0.7];
    } else if (phase === '48h') {
      factors = isLeft
        ? [0.82, 0.88, 0.92, 0.78, 0.85, 0.95, 0.9, 0.86, 0.82, 0.9, 0.92, 0.85]
        : [0.85, 0.86, 0.9, 0.82, 0.88, 0.92, 0.86, 0.89, 0.84, 0.88, 0.9, 0.87];
    } else { // 72h
      factors = isLeft
        ? [0.94, 0.97, 0.99, 0.92, 0.95, 0.99, 0.98, 0.96, 0.94, 0.98, 0.99, 0.96]
        : [0.95, 0.96, 0.98, 0.94, 0.97, 0.99, 0.96, 0.98, 0.95, 0.97, 0.98, 0.96];
    }

    return factors.map((f, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const r = f * maxRadius;
      const x = center + r * Math.sin(angle);
      const y = center - r * Math.cos(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // --- TAB 7: Antibacterial Data ---
  const antibacterialTests = [
    { name: 'Escherichia coli (대장균 항균시험)', initial: '3.4 × 10⁵', afterBlank: '4.7 × 10⁵', afterSam: '< 10', rate: '99.9%' },
    { name: 'Pseudomonas aeruginosa (녹농균 항균시험)', initial: '3.6 × 10⁵', afterBlank: '4.9 × 10⁵', afterSam: '< 10', rate: '99.9%' },
    { name: 'Staphylococcus aureus (황색포도상구균 항균시험)', initial: '2.8 × 10⁵', afterBlank: '3.7 × 10⁵', afterSam: '< 10', rate: '99.9%' }
  ];

  // --- TAB 8: Deodorization Data ---
  const deodorizationSteps = [
    { time: 0, ppm: 50, rate: 0 },
    { time: 30, ppm: 15, rate: 70 },
    { time: 60, ppm: 8, rate: 84 },
    { time: 90, ppm: 5, rate: 90 },
    { time: 120, ppm: 4, rate: 92 }
  ];

  return (
    <div className="w-full space-y-16 select-text pt-4">
      
      {/* Scrollable Flow Header Guide */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="text-left font-sans">
            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-widest leading-none">
              TERRAMUVICS SCIENTIFIC BIOPHOTON ENGINE
            </span>
            <span className="text-xs text-cyan-400 font-extrabold">
              {isEn ? "Continuous Scroll Mode Enabled (Scroll Down to View All Pages)" : "연속 스크롤 연동 활성화 (밑으로 스크롤하여 모든 페이지를 차례로 확인하세요)"}
            </span>
          </div>
        </div>
        <div className="text-[10px] uppercase font-mono font-black text-slate-400 border border-white/10 px-3 py-1 rounded bg-slate-950/40">
          {isEn ? "8 Technical Pages" : "총 8개의 기술 세부 페이지 스택"}
        </div>
      </div>

      {/* 🔮 PAGE 01: Concept */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 01
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                TMV BIO-RESONANCE ENGINE
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "01. TerraMuVics Active Quantum Biophoton" : "01. 테라뮤빅스 (TerraMuVics) 생체 공명 활성물질 요약"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "TerraMuVics (TMV) is an advanced quantum mineral formulation that generates high-density biophotons. It activates cell membrane permeability, triggering rapid nutrient delivery and clinical-grade detoxification."
                  : "테라뮤빅스(TMV)는 천연 복합 무기 광물 물질을 극소 미세 나노 입자로 특수 가교하여 원자 고유의 파동(Bio-Resonance) 에너지를 방사하도록 설계된 첨단 생체 광학 활성화 소체입니다. 세포 내막을 투과하여 림프계 해독 작용을 정량 촉진합니다."
                }
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Restores ideal cell water clusters, yielding outstanding detox."
                : "✓ 음용 전후 혈류 속도 증대, 체액 수송율 정밀 상승, 호르몬 균형 조절 등 총 30가지 인체 신호 물질의 밸런스를 정밀 개선합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 space-y-4">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                {isEn ? "TMV 5 Core Biological Virtues" : "테라뮤빅스 5대 핵심 생체 활성 기작"}
              </h5>
              <div className="space-y-2">
                {[
                  { num: '1', title: isEn ? 'Biophoton Energy Generation' : '고밀도 양자 파동 에너지 방사', desc: isEn ? 'Resonates directly with water molecules.' : '인체 체액수 분자 구조를 미세 정형하여 대사 효율을 높입니다.' },
                  { num: '2', title: isEn ? 'Cell Membrane Permeability' : '세포 내막 투과 수송 속도 증가', desc: isEn ? 'Accelerates nutrient hydration.' : '체내 미네랄 이온이 유실 없이 세포막 내부로 97% 이상 전달되도록 유도합니다.' },
                  { num: '3', title: isEn ? 'Lymphatic Detoxification' : '림프액 및 장내 노폐물 배출', desc: isEn ? 'Flushes toxic plaque.' : '체내에 잔존하는 혈전, 노화 지질 물질 및 유해 가스를 신속히 기화 중화시킵니다.' },
                  { num: '4', title: isEn ? 'pH Neutralization' : '인체 산성 산화 풍화 억제', desc: isEn ? 'Maintains healthy weak alkalines.' : '스트레스로 인해 산성화된 체액을 가장 이상적인 약알칼리성(pH 7.4)으로 중화합니다.' },
                  { num: '5', title: isEn ? 'Eco-Safe Mineral Formulation' : '친환경 100% 무독성 광물 설계', desc: isEn ? 'Zero synthetic chemicals.' : '화학적 가소제나 독성 가스 배출 우려가 전혀 없는 천연 세라믹 결정 공법입니다.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-900/60 border border-white/5 rounded-xl flex gap-3 items-start">
                    <span className="w-4.5 h-4.5 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold text-cyan-400 font-mono flex-shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div>
                      <span className="text-xs text-white font-extrabold block">{item.title}</span>
                      <span className="text-[10px] text-slate-400 block leading-normal">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 02: Mineral Water Compare */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 02
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                MINERAL CONCENTRATION TEST
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Droplet className="w-5 h-5 text-cyan-400" />
                {isEn ? "02. Trace Mineral Density Analysis" : "02. 물 미네랄 분석 및 테라뮤빅스 대조군 통계"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Standard reverse-osmosis water strips out vital minerals. TMV filters retain rich Calcium and Potassium while balancing Magnesium and Sodium."
                  : "역삼투압 정수 방식(R/O)은 물속의 주요 생체 미네랄까지 완전히 걸러내어 산성화된 물을 만듭니다. 테라뮤빅스(SAM 필터링)는 생체 필수 미네랄인 칼슘(Ca)과 칼륨(K)을 극대화하여 세포 영양 전송을 최적화합니다."}
              </p>
            </div>
            
            <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl text-[10px] text-cyan-300">
              * 데이터 단위: mg/L (공식 먹는물 수질기준 공인 대조)
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/40 border border-white/10 p-5 rounded-3xl flex flex-col justify-between space-y-4">
            <h5 className="text-xs font-mono text-cyan-400 font-extrabold">[미네랄 함량 대조 그래프 및 통계표]</h5>
            
            <div className="space-y-3">
              {mineralData.map((m, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-white/5 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{isEn ? m.name : m.kr}</span>
                    <span className="text-cyan-400 font-black font-mono">TMV: {m.sam.toFixed(2)} mg/L</span>
                  </div>
                  
                  {/* Visual Bar scale comparing Tap, RO, SAM */}
                  <div className="space-y-1 font-mono text-[9px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-12">TMV (SAM):</span>
                      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-cyan-400/20">
                        <div className="bg-gradient-to-r from-cyan-400 to-teal-400 h-full" style={{ width: `${(m.sam / 30) * 100}%` }} />
                      </div>
                      <span className="w-12 text-right">{m.sam.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-12">한우물:</span>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-slate-500 h-full" style={{ width: `${(m.hanumul / 30) * 100}%` }} />
                      </div>
                      <span className="w-12 text-right">{m.hanumul.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-12">역삼투압:</span>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full" style={{ width: `${(m.ro / 30) * 100}%` }} />
                      </div>
                      <span className="w-12 text-right">{m.roDisplay || m.ro.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 03: BRS Guideline */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 03
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                BRS INTERPRETATION GUIDELINES
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "03. Bio-Resonance Spectroscopy (BRS) Guide" : "03. 생체 공명 전자기 스펙트럼 (BRS) 해석 기준"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "The BRS index ranges from -21 to +21, evaluating human cell bio-resonance vitality. Scores above +10 represent flawless vital defense, while negative values indicate critical cell exhaustion."
                  : "생체 전자기 파동(BRS) 측정 기법은 -21부터 +21 범위 내에서 인체 장기 및 생체 흐름의 정상 진동 상태를 측정합니다. +10 이상은 이상적인 자가면역 활성화 상태를, 마이너스 영역은 심각한 세포 에너지 방출 저하 상태를 표기합니다."
                }
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Drag the simulator slider to understand different biological health indexes."
                : "✓ 밑의 실시간 시뮬레이터 슬라이더를 마우스나 터치로 직접 드래그하여 BRS 주사 단계별 생체 건강 수치를 확인하십시오."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                BRS LEVEL SIMULATOR
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Interactive BRS Spectrum Calculator" : "BRS 값에 따른 실시간 장기 건강 정합 시뮬레이터"}
              </h5>
              
              <div className="p-5 bg-slate-900/50 border border-cyan-500/20 rounded-xl space-y-4 shadow-inner">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>BRS 측정치 (스펙트럼 값)</span>
                  <span className="text-cyan-400 font-black text-sm">{brsSliderVal > 0 ? `+${brsSliderVal}` : brsSliderVal}</span>
                </div>
                
                <input 
                  type="range" 
                  min="-21" 
                  max="21" 
                  value={brsSliderVal} 
                  onChange={(e) => setBrsSliderVal(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1 bg-slate-950 rounded-lg appearance-none"
                />

                <div className={`p-4 rounded-xl border ${currentBrsGuide.bg} space-y-2 transition-all`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">{isEn ? currentBrsGuide.enState : currentBrsGuide.krState}</span>
                    <span className="text-[9px] font-mono text-slate-400">#GUIDE LEVEL</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed leading-normal">
                    {isEn ? currentBrsGuide.enImpact : currentBrsGuide.krImpact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 04: 30 BRS Parameter Tests */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 04
          </div>

          <div className="lg:col-span-12 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                  30-PARAMETER BRS CLINICAL RUNS
                </span>
                <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  04. 30대 핵심 생체 임상 파동 추적 시트
                </h4>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder={isEn ? "Search parameter..." : "생체 항목 검색 (예: 스트레스, 위...)"}
                  value={brsSearch}
                  onChange={(e) => setBrsSearch(e.target.value)}
                  className="bg-slate-900 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 w-60"
                />
              </div>
            </div>

            <p className="text-xs text-slate-300">
              {isEn 
                ? "Scroll and select any parameter below to view how bio-resonance levels improve over a 72-hour period."
                : "아래 파동 측정 지표에서 특정 행을 클릭하여 선택하시면, 72시간 경과 단계별 생체 개선 수치를 하단 패널에서 정밀하게 비교하실 수 있습니다."}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Table side (cols 7) */}
              <div className="lg:col-span-7 overflow-y-auto max-h-96 rounded-xl border border-white/10 bg-slate-950/50">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-900/60 font-mono text-[10px] text-slate-400">
                      <th className="p-3">CODE</th>
                      <th className="p-3">파동 측정 지표</th>
                      <th className="p-3 text-center">음용전 BRS</th>
                      <th className="p-3 text-center">72H BRS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {filteredBrs.map((p, pIdx) => {
                      const isSelected = activeBrsParam.id === p.id;
                      return (
                        <tr 
                          key={p.id} 
                          onClick={() => {
                            const foundIdx = brsParameters.findIndex(bp => bp.id === p.id);
                            setSelectedBrsRow(foundIdx);
                          }}
                          className={`hover:bg-cyan-500/5 transition-colors cursor-pointer ${isSelected ? 'bg-cyan-950/20 border-l-2 border-cyan-400' : ''}`}
                        >
                          <td className="p-3 font-mono font-extrabold text-cyan-400">{p.code}</td>
                          <td className="p-3">
                            <span className="font-bold text-white block">{isEn ? p.nameEn : p.nameKr}</span>
                            <span className="text-[9px] text-slate-500 block">{isEn ? p.nameKr : p.nameEn}</span>
                          </td>
                          <td className="p-3 text-center font-mono text-red-400 font-bold">{p.values[0]}</td>
                          <td className="p-3 text-center font-mono text-teal-400 font-bold">+{p.values[6]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Chart/Visual side (cols 5) */}
              <div className="lg:col-span-5 p-5 bg-slate-900/40 border border-white/10 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-cyan-400 font-extrabold block">[실시간 파동 개선 추적 결과]</span>
                  <h5 className="text-md font-black text-white">{isEn ? activeBrsParam.nameEn : activeBrsParam.nameKr} 파동 시계열</h5>
                  
                  <div className="space-y-2 font-mono">
                    {activeBrsParam.values.map((v, idx) => {
                      const percentage = ((v / 12) * 100).toFixed(0);
                      const isEnd = idx === 6;
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className={isEnd ? "text-cyan-400 font-extrabold" : "text-slate-400"}>
                              {isEn ? timeLabelsEn[idx] : timeLabels[idx]}
                            </span>
                            <span className={isEnd ? "text-cyan-400 font-extrabold" : "text-slate-300"}>
                              BRS: {v}
                            </span>
                          </div>
                          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${isEnd ? 'bg-gradient-to-r from-cyan-400 to-teal-400' : 'bg-slate-600'}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-center text-[10px] text-slate-300">
                  * 72시간 경과 후 면역 및 생환 지표가 완만하게 10 이상 안착됨을 알 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 05: Organ Resonance */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 05
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                ORGANIC RESONANCE CROWN-TV
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "05. Crown-TV Organic Meridian Wave Analysis" : "05. 오장육부 생체 파동 공명 작용 (Crown-TV)"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Crown-TV maps biophoton density across major meridians. Drinking TMV mineral water strengthens nervous, respiratory, and endocrine resonance vectors over 72 hours."
                  : "Crown-TV 생체 전자기 주사 시스템은 인체의 메리디안(경락) 에너지 흐름을 양방향 12축 극성 벡터로 표현합니다. 테라뮤빅스 수용액 음용 시 신경, 호흡, 내분비 경계면 파동이 72시간 내에 조화로운 균등 원형 배열을 이룹니다."}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              <span className="text-cyan-400 font-extrabold block mb-1">* 실시간 파동 대역 선택 :</span>
              <div className="flex gap-2">
                {[
                  { id: 'before', kr: '음용 전', en: 'Before' },
                  { id: '24h', kr: '24시간 후', en: '24 Hours' },
                  { id: '48h', kr: '48시간 후', en: '48 Hours' },
                  { id: '72h', kr: '72시간 후', en: '72 Hours' }
                ].map((ph) => (
                  <button 
                    key={ph.id}
                    onClick={() => setRadialPhase(ph.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer border ${
                      radialPhase === ph.id 
                        ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 border-cyan-300 shadow-lg'
                        : 'bg-slate-900 text-slate-400 border-white/5 hover:border-cyan-400/30'
                    }`}
                  >
                    {isEn ? ph.en : ph.kr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                RADIAL RESONANCE WAVEFORM
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Left & Right Organic Meridian Polars" : "생체 극성 에너지 대역 파동 (좌/우 대칭 비교)"}
              </h5>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Left Polar radar */}
                <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-center flex flex-col items-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Left Meridian polar (좌경락)</span>
                  <svg className="w-28 h-28" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="75" stroke="#334155" strokeWidth="0.5" fill="none" />
                    <circle cx="100" cy="100" r="50" stroke="#1e293b" strokeWidth="0.5" fill="none" />
                    <circle cx="100" cy="100" r="25" stroke="#1e293b" strokeWidth="0.5" fill="none" />
                    
                    {/* Active wave polygon */}
                    <polygon 
                      points={getRadarPoints(radialPhase, true)} 
                      fill="url(#leftRadarGlow)" 
                      stroke="#22d3ee" 
                      strokeWidth="1.5" 
                    />
                    
                    <defs>
                      <linearGradient id="leftRadarGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[9px] text-cyan-300 font-mono block mt-1">Nervous / Endocrine Flow</span>
                </div>

                {/* Right Polar radar */}
                <div className="p-3 bg-slate-950 rounded-xl border border-white/5 text-center flex flex-col items-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Right Meridian polar (우경락)</span>
                  <svg className="w-28 h-28" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="75" stroke="#334155" strokeWidth="0.5" fill="none" />
                    <circle cx="100" cy="100" r="50" stroke="#1e293b" strokeWidth="0.5" fill="none" />
                    <circle cx="100" cy="100" r="25" stroke="#1e293b" strokeWidth="0.5" fill="none" />
                    
                    {/* Active wave polygon */}
                    <polygon 
                      points={getRadarPoints(radialPhase, false)} 
                      fill="url(#rightRadarGlow)" 
                      stroke="#10b981" 
                      strokeWidth="1.5" 
                    />
                    
                    <defs>
                      <linearGradient id="rightRadarGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[9px] text-emerald-300 font-mono block mt-1">Immune / Lymphatic Flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 06: pH Experiment */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 06
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                PH WEAK ALKALINE EXPERIMENT
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "06. Weak Alkaline pH Neutralization Test" : "06. 체액 산도(pH) 중화 실증 실험 모델"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Standard acidic beverages accelerate cellular aging. TMV water acts as an outstanding natural buffer, neutralizing metabolic acidity to secure ideal pH homeostasis."
                  : "대부분의 인스턴트 가공식품과 오염수는 인체 세포를 염증에 취약한 '만성 산성' 상태로 유인합니다. 테라뮤빅스 수용액은 독자 미네랄 완충 제재를 통해 산성화된 체액을 약알칼리 영역으로 완벽히 리셋 중화시킵니다."}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Keeps physiological systems buffered and safe from oxidative stress."
                : "✓ 음용 전후 혈액 수용 테스트에서 활성 산소에 의한 유전 손상율이 약 42% 수준 감소하는 놀라운 항산화 가치가 실증되었습니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                PH COLOR BUFFER RANGE
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Neutralization Color Indicator scale" : "시약 처리에 따른 체액 pH 완충 중화 범위"}
              </h5>
              
              {/* Beaker / Color indicator scale */}
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-4 text-center">
                <div className="flex justify-around items-center h-20">
                  <div className="text-center">
                    <div className="w-10 h-14 bg-red-400/30 border-b border-red-400 rounded-b-lg flex items-center justify-center font-mono text-[9px] text-red-300 font-black">pH 4.5</div>
                    <span className="text-[8px] text-slate-400 font-bold block mt-1">산성 (에폭시/오염원)</span>
                  </div>
                  
                  <div className="text-slate-500 text-lg">➔</div>
                  
                  <div className="text-center">
                    <div className="w-10 h-14 bg-yellow-400/30 border-b border-yellow-400 rounded-b-lg flex items-center justify-center font-mono text-[9px] text-yellow-300 font-black">pH 6.5</div>
                    <span className="text-[8px] text-slate-400 font-bold block mt-1">중성 대역</span>
                  </div>

                  <div className="text-slate-500 text-lg">➔</div>

                  <div className="text-center animate-pulse">
                    <div className="w-10 h-14 bg-cyan-400/30 border-b border-cyan-400 rounded-b-lg flex items-center justify-center font-mono text-[9px] text-cyan-300 font-black">pH 7.4</div>
                    <span className="text-[8px] text-cyan-400 font-bold block mt-1">TMV 약알칼리</span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 block">* 이상적인 생리 대사 및 면역 기능이 상시 안정 발현하는 최상위 농도 범위입니다.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 07: Antibacterial */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 07
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                ANTIBACTERIAL KCL CERTIFICATIONS
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                {isEn ? "07. Antibacterial & Antifungal Certs" : "07. 항균 및 항곰팡이 99.9% 멸균 증명"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Standard mineral solutions are easily compromised by microbial growths. TMV establishes robust physical barriers, delivering a flawless 99.9% sterile environment."
                  : "일반 지하 배수로 및 주거 수조 공극은 세균 및 녹조, 진균의 번식에 쉽게 노출됩니다. 테라뮤빅스 양원자는 균사체 표면 전위를 뒤흔들어, 대장균과 황색포도상구균을 단 한 마리도 살려두지 않는 완벽 멸균 등급을 시현합니다."}
              </p>
            </div>
            
            <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl text-[10px] text-cyan-300">
              * KCL (한국건설생활환경시험연구원) 표준 시험성적 취득
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/40 border border-white/10 p-5 rounded-3xl flex flex-col justify-between space-y-4">
            <h5 className="text-xs font-mono text-cyan-400 font-extrabold">[99.9% 살균 실증 표준 시험성적 데이터]</h5>
            
            <div className="space-y-3 font-sans text-xs">
              {antibacterialTests.map((t, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-white/5 rounded-xl grid grid-cols-3 gap-2 items-center">
                  <div className="col-span-2">
                    <span className="font-bold text-slate-200 block">{t.name}</span>
                    <span className="text-[9px] text-slate-500 block">초기 농도: {t.initial} cf/cc</span>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-400 font-black text-sm px-2.5 py-1 rounded bg-cyan-950/50 border border-cyan-500/20 inline-block">
                      {t.rate} 살멸
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 PAGE 08: Deodorization */}
      <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950/65 rounded-[22px] border border-white/10 p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="absolute top-4 right-4 text-xs font-mono font-black text-white/10 tracking-[0.2em]">
            PAGE // 08
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-400/10 inline-block">
                AMMONIA GAS DEODORIZATION REPORT
              </span>
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {isEn ? "08. Ammonia Gas Deodorization Proof" : "08. 암모니아 탈취율 92.0% 정량 증명"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/30 p-4 border border-white/5 rounded-xl">
                {isEn
                  ? "Standard wastewater and storage sites yield severe foul odors. TMV's high energy transport catalyzes molecular degradation, eliminating volatile ammonia compounds within 120 minutes."
                  : "각종 하수 슬러지 및 지하 배수시설 내에서 수없이 방출되는 암모니아 고독성 악취가스를 테라뮤빅스 공명 에너지 분해를 통해 고도 여과합니다. 전자기 파동에 노출된 탈취 시료는 밀폐 120분 만에 악취 가스의 92% 이상을 무기질 소산시킵니다."}
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 border border-white/5 rounded-xl text-[10.5px] text-slate-300 leading-relaxed font-sans">
              {isEn
                ? "✓ Rapidly reduces ammonia toxicity from 50ppm to under 4ppm."
                : "✓ 정수장 및 아파트 공동 주차장, 화학 오물 정화 처리 수조 등에 적극 적용되어 별도의 환기 모터 가동비용 없이 청결을 반영구 보장합니다."
              }
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-cyan-400 font-black bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                DEODORIZATION DECAY CURVE
              </span>
              <h5 className="text-sm font-extrabold text-white">
                {isEn ? "Ammonia Concentration Drop over 120min" : "시간 경과(120분)에 따른 악취 암모니아 잔존율 추세"}
              </h5>
              
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-3 font-mono text-xs">
                {deodorizationSteps.map((step, sIdx) => {
                  const percentageLeft = (step.ppm / 50) * 100;
                  return (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-400">{step.time}분 경과</span>
                        <span className="text-cyan-400 font-black">{step.ppm} ppm (탈취율: {step.rate}%)</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-cyan-400 h-full transition-all" style={{ width: `${percentageLeft}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
