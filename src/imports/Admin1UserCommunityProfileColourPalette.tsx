import svgPaths from "./svg-ht3r6hcv9e";
import imgOpacitySliderTrack from "figma:asset/865fe501de8d7a2e38a7b37f326cef2104c26b5b.png";

function Sidebar() {
  return <div className="absolute h-[1080px] left-[calc(50%-1044px)] rounded-br-[24px] rounded-tr-[24px] top-0 translate-x-[-50%] w-[170px]" data-name="Sidebar" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(90deg, rgb(47, 54, 60) 0%, rgb(47, 54, 60) 100%)" }} />;
}

function Group17() {
  return (
    <div className="absolute contents left-[-154px] top-[28px]">
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] left-[-154px] text-[#ebeef1] text-[18px] top-[40px] translate-y-[-50%] w-[126.01px]">
        <p className="leading-[normal]">{`Spin Sum   `}</p>
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents left-[-154px] top-[15px]">
      <Group17 />
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] left-[-154px] text-[7px] text-[rgba(207,164,247,0.6)] top-[21px] translate-y-[-50%] w-[126.01px]">
        <p className="leading-[normal]">COMMUNITY</p>
      </div>
    </div>
  );
}

function DropdownToggle() {
  return (
    <div className="absolute left-[-38px] size-[24px] top-[28px]" data-name="Dropdown Toggle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Dropdown Toggle">
          <path clipRule="evenodd" d={svgPaths.p39442200} fill="var(--fill-0, #EBEEF1)" fillOpacity="0.4" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[-38px] top-[28px]">
      <DropdownToggle />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents left-[-154px] top-[15px]">
      <Group20 />
      <Group18 />
    </div>
  );
}

function MenuItem() {
  return (
    <div className="bg-[rgba(207,164,247,0.1)] content-stretch flex gap-[12px] h-[40px] items-center px-[12px] py-0 relative rounded-[99px] shrink-0 w-[140px]" data-name="Menu Item">
      <div aria-hidden="true" className="absolute border-[#cfa4f7] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[99px]" />
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold grow h-full justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#ebeef1] text-[13px]">
        <p className="leading-[1.4]">Overview</p>
      </div>
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center px-[12px] py-0 relative rounded-[99px] shrink-0 w-[140px]" data-name="Menu Item">
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold grow h-full justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#ebeef1] text-[13px]">
        <p className="leading-[1.4]">Inbox</p>
      </div>
    </div>
  );
}

function MenuItem2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center px-[12px] py-0 relative rounded-[99px] shrink-0 w-[140px]" data-name="Menu Item">
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold grow h-full justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#ebeef1] text-[13px]">
        <p className="leading-[1.4]">Sent</p>
      </div>
    </div>
  );
}

function MenuItem3() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center px-[12px] py-0 relative rounded-[99px] shrink-0 w-[140px]" data-name="Menu Item">
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold grow h-full justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#ebeef1] text-[13px]">
        <p className="leading-[1.4]">Members</p>
      </div>
    </div>
  );
}

function MenuItem4() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center px-[12px] py-0 relative rounded-[99px] shrink-0 w-[140px]" data-name="Menu Item">
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold grow h-full justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#ebeef1] text-[13px]">
        <p className="leading-[1.4]">Analytics</p>
      </div>
    </div>
  );
}

function MenuItems() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[-154px] rounded-[99px] top-[80px] w-[140px]" data-name="Menu items">
      <MenuItem />
      <MenuItem1 />
      <MenuItem2 />
      <MenuItem3 />
      <MenuItem4 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents left-[-169px] top-0">
      <Sidebar />
      <Group22 />
      <MenuItems />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[4.83%_6.25%_9.38%_6.25%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.75 22.3068">
        <g id="Group 14">
          <path d={svgPaths.p38113700} fill="var(--fill-0, #7DA2EC)" id="Ellipse 7" />
          <path d={svgPaths.p28eebb00} fill="var(--fill-0, #7DA2EC)" id="Ellipse 8" />
          <path d={svgPaths.p3498d640} fill="var(--fill-0, #CFA4F7)" id="Rectangle 5" />
          <path d={svgPaths.p2d3e0900} fill="var(--fill-0, #9BE8DC)" id="Rectangle 6" />
          <path d={svgPaths.p599b580} fill="var(--fill-0, #C47A7F)" id="Rectangle 7" />
        </g>
      </svg>
    </div>
  );
}

function IconManWithHat() {
  return (
    <div className="absolute left-[7px] overflow-clip size-[26px] top-[7px]" data-name="Icon Man with hat">
      <Group6 />
    </div>
  );
}

function MenuItemIcons() {
  return (
    <div className="relative rounded-bl-[99px] rounded-br-[24px] rounded-tr-[24px] shrink-0 size-[40px]" data-name="Menu Item Icons">
      <IconManWithHat />
    </div>
  );
}

function Contact() {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] content-stretch flex gap-[8px] items-center relative rounded-[99px] shrink-0 w-[40px]" data-name="Contact">
      <MenuItemIcons />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[40px] justify-center leading-[0] relative shrink-0 text-[#2f363c] text-[13px] w-[119px]">
        <p className="leading-[1.4]">All Users</p>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute bottom-[30%] left-[25.31%] right-[26.94%] top-1/4">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.1023 18">
        <g id="Group 26">
          <path d={svgPaths.p1876b200} fill="var(--fill-0, #CFA4F7)" id="Subtract" />
          <path d={svgPaths.pef07780} fill="var(--fill-0, #9BE8DC)" id="Subtract_2" />
          <path d={svgPaths.p13aa0d80} fill="var(--fill-0, #7DA2EC)" id="Ellipse 1" />
        </g>
      </svg>
    </div>
  );
}

function MenuItemIcons1() {
  return (
    <div className="relative rounded-bl-[99px] rounded-br-[24px] rounded-tr-[24px] shrink-0 size-[40px]" data-name="Menu Item Icons">
      <Group7 />
    </div>
  );
}

function Billing() {
  return (
    <div className="bg-[#faf8f5] content-stretch flex gap-[8px] items-center relative rounded-[99px] shrink-0 w-[40px]" data-name="Billing">
      <MenuItemIcons1 />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[40px] justify-center leading-[0] relative shrink-0 text-[#2f363c] text-[13px] w-[119px]">
        <p className="leading-[1.4]">Analytics</p>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-start left-[15px] top-[150px] w-[160px]">
      <Contact />
      <Billing />
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="absolute bg-[#e5ddce] h-[1080px] left-0 rounded-br-[24px] shadow-[0px_5px_14px_0px_rgba(0,0,0,0.05)] top-0 w-[235px]" data-name="Sidebar1">
      <Frame16 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute inset-[23.33%_20%_23.33%_26.67%]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3333 21.3333">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p35875400} fill="var(--fill-0, #2F363C)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p294568f0} fill="var(--fill-0, #2F363C)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MenuItemIcons2() {
  return (
    <div className="absolute left-[15px] rounded-[99px] size-[40px] top-[1024px]" data-name="Menu Item Icons">
      <div className="absolute bg-[rgba(255,255,255,0.8)] inset-0 rounded-[999px]" />
      <Frame />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents left-[15px] top-[1024px]">
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[40px] justify-center leading-[0] left-[69px] text-[#2f363c] text-[14px] top-[1044px] tracking-[0.5px] translate-y-[-50%] w-[87px]">
        <p className="leading-[1.4]">Sign Out</p>
      </div>
      <MenuItemIcons2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[33.957px] left-[5.17%] right-[93.7%] top-[16.99px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.7998 33.9575">
        <g id="Group">
          <path d={svgPaths.p4814d80} fill="var(--fill-0, #6689CF)" id="Vector" />
          <path d={svgPaths.p39ad8900} fill="var(--fill-0, #B687E3)" id="Vector_2" />
          <path d={svgPaths.p37bb7700} fill="var(--fill-0, #80C9BD)" id="Vector_3" />
          <path d={svgPaths.p2f7898c0} fill="var(--fill-0, #C47A7F)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute h-[26.855px] left-[0.94%] right-[94.35%] top-[24.84px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90.5705 26.8551">
        <g id="Group">
          <path d={svgPaths.p5486f80} fill="var(--fill-0, #2F363C)" id="Vector" />
          <path d={svgPaths.p3a2b4300} fill="var(--fill-0, #2F363C)" id="Vector_2" />
          <path d={svgPaths.p143d7000} fill="var(--fill-0, #2F363C)" id="Vector_3" />
          <path d={svgPaths.p994ca80} fill="var(--fill-0, #2F363C)" id="Vector_4" />
          <path d={svgPaths.p33486100} fill="var(--fill-0, #2F363C)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute contents left-[0.94%] right-[93.7%] top-[16.99px]" data-name="Logo">
      <Group />
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[7.95%_9.37%_4.83%_9.38%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.875 19.1875">
        <g id="Group 1">
          <path d={svgPaths.p2d030500} fill="var(--fill-0, #7DA2EC)" id="Rectangle 3" />
          <path d={svgPaths.p2f1e0500} fill="var(--fill-0, #B687E3)" id="Rectangle 2" />
          <path clipRule="evenodd" d={svgPaths.pbd20bf0} fill="var(--fill-0, #B687E3)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function IconLoveMessage() {
  return (
    <div className="overflow-clip relative size-[22px]" data-name="Icon Love message">
      <Group2 />
    </div>
  );
}

function MenuItemIcons3() {
  return (
    <div className="relative rounded-bl-[99px] rounded-br-[24px] rounded-tr-[24px] shrink-0 size-[40px]" data-name="Menu Item Icons">
      <div className="absolute flex items-center justify-center left-[10px] size-[22px] top-[9px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <IconLoveMessage />
        </div>
      </div>
    </div>
  );
}

function MyComunitites() {
  return (
    <div className="h-[40px] relative shrink-0 w-[119px]" data-name="My Comunitites">
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold inset-0 justify-center leading-[0] text-[#2f363c] text-[13px]">
        <p className="leading-[1.4]">My Comunitites</p>
      </div>
    </div>
  );
}

function MyCommunities() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex gap-[8px] items-center left-[15px] rounded-[99px] top-[80px] w-[203px]" data-name="My Communities">
      <div aria-hidden="true" className="absolute border border-[#80c9bd] border-solid inset-0 pointer-events-none rounded-[99px]" />
      <MenuItemIcons3 />
      <MyComunitites />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents left-0 top-0">
      <Sidebar1 />
      <Group23 />
      <Logo />
      <MyCommunities />
    </div>
  );
}

function SystemEye() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="System / Eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="System / Eye">
          <path d={svgPaths.p28dac680} fill="var(--fill-0, #2F363C)" id="Style" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[rgba(47,54,60,0.1)] content-stretch flex items-center justify-center left-[1414px] px-[16px] py-[8px] rounded-[99px] size-[40px] top-[298px]">
      <SystemEye />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute left-[1540px] size-[40px] top-[299px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame 680">
          <rect fill="var(--fill-0, #2F363C)" fillOpacity="0.1" height="40" rx="20" width="40" />
          <g id="Shape">
            <path d={svgPaths.p12910500} fill="var(--fill-0, #2F363C)" />
            <path d={svgPaths.p208c7d00} fill="var(--fill-0, #2F363C)" />
            <path clipRule="evenodd" d={svgPaths.p16e7ab80} fill="var(--fill-0, #2F363C)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Status() {
  return (
    <div className="absolute contents left-[818px] top-[303px]" data-name="Status">
      <div className="absolute bg-[#7bd3c4] h-[32px] left-[818px] rounded-[99px] top-[303px] w-[89.314px]" />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[25.6px] justify-center leading-[0] left-[863.34px] not-italic text-[#2f363c] text-[13px] text-center top-[318px] translate-x-[-50%] translate-y-[-50%] w-[89.314px]">
        <p className="leading-[24px]">Published</p>
      </div>
    </div>
  );
}

function SystemEye1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="System / Eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="System / Eye">
          <path d={svgPaths.p28dac680} fill="var(--fill-0, #2F363C)" id="Style" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-[rgba(47,54,60,0.1)] content-stretch flex items-center justify-center left-[1414px] px-[16px] py-[8px] rounded-[99px] size-[40px] top-[379px]">
      <SystemEye1 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute left-[1540px] size-[40px] top-[379px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame 680">
          <rect fill="var(--fill-0, #2F363C)" fillOpacity="0.1" height="40" rx="20" width="40" />
          <g id="Shape">
            <path d={svgPaths.p12910500} fill="var(--fill-0, #2F363C)" />
            <path d={svgPaths.p208c7d00} fill="var(--fill-0, #2F363C)" />
            <path clipRule="evenodd" d={svgPaths.p16e7ab80} fill="var(--fill-0, #2F363C)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Status1() {
  return (
    <div className="absolute contents left-[821px] top-[383px]" data-name="Status">
      <div className="absolute bg-[#d3ccbf] h-[32px] left-[821px] rounded-[99px] top-[383px] w-[58.55px]" />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[25.6px] justify-center leading-[0] left-[850.72px] not-italic text-[#2f363c] text-[13px] text-center top-[399px] translate-x-[-50%] translate-y-[-50%] w-[58.55px]">
        <p className="leading-[24px]">Draft</p>
      </div>
    </div>
  );
}

function SystemEye2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="System / Eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="System / Eye">
          <path d={svgPaths.p28dac680} fill="var(--fill-0, #2F363C)" id="Style" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-[rgba(47,54,60,0.1)] content-stretch flex items-center justify-center left-[1414px] px-[16px] py-[8px] rounded-[99px] size-[40px] top-[460px]">
      <SystemEye2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-[rgba(47,54,60,0.1)] content-stretch flex items-center justify-center left-[1288px] px-[16px] py-[8px] rounded-[99px] size-[40px] top-[299px]">
      <p className="font-['Komet:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">pen</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-[rgba(47,54,60,0.1)] content-stretch flex items-center justify-center left-[1288px] px-[16px] py-[8px] rounded-[99px] size-[40px] top-[379px]">
      <p className="font-['Komet:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">pen</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-[rgba(47,54,60,0.1)] content-stretch flex items-center justify-center left-[1288px] px-[16px] py-[8px] rounded-[99px] size-[40px] top-[458px]">
      <p className="font-['Komet:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap">pen</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute left-[1540px] size-[40px] top-[458px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame 680">
          <rect fill="var(--fill-0, #2F363C)" fillOpacity="0.1" height="40" rx="20" width="40" />
          <g id="Shape">
            <path d={svgPaths.p12910500} fill="var(--fill-0, #2F363C)" />
            <path d={svgPaths.p208c7d00} fill="var(--fill-0, #2F363C)" />
            <path clipRule="evenodd" d={svgPaths.p16e7ab80} fill="var(--fill-0, #2F363C)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Status2() {
  return (
    <div className="absolute contents left-[821px] top-[462px]" data-name="Status">
      <div className="absolute bg-[#d3ccbf] h-[32px] left-[821px] rounded-[99px] top-[462px] w-[58.55px]" />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[25.6px] justify-center leading-[0] left-[850.72px] not-italic text-[#2f363c] text-[13px] text-center top-[478px] translate-x-[-50%] translate-y-[-50%] w-[58.55px]">
        <p className="leading-[24px]">Draft</p>
      </div>
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute h-[44.286px] left-[464px] top-[297px] w-[40px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 44.2857">
        <g clipPath="url(#clip0_87_2022)" id="Layer_1">
          <path d={svgPaths.p2d10d880} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p33804c40} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.pc9eb000} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p1ccb8900} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p2b4a5980} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p2834ba00} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p1608b1b0} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p3e250500} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p3ade5600} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p14e99d80} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p382f4d00} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.p1dcab380} fill="var(--fill-0, white)" id="Vector_12" />
          <path d={svgPaths.p348c4500} fill="var(--fill-0, white)" id="Vector_13" />
          <path d={svgPaths.p3f462540} fill="var(--fill-0, white)" id="Vector_14" />
          <path d={svgPaths.p351f9300} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.p2b171800} fill="var(--fill-0, white)" id="Vector_16" />
          <path d={svgPaths.p358e8b00} fill="var(--fill-0, white)" id="Vector_17" />
        </g>
        <defs>
          <clipPath id="clip0_87_2022">
            <rect fill="white" height="44.2857" width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[464px] top-[297px]">
      <Layer />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[10px] left-[calc(50%-473px)] top-[calc(50%-141px)] translate-x-[-50%] translate-y-[-50%] w-[56px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 10">
        <g clipPath="url(#clip0_87_2094)" id="Frame">
          <path clipRule="evenodd" d={svgPaths.p2ff78900} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_87_2094">
            <rect fill="white" height="10" width="56" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents left-[450px] top-[363px]">
      <div className="absolute left-[450px] rounded-bl-[12px] rounded-tl-[12px] size-[72px] top-[363px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-bl-[12px] rounded-tl-[12px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-bl-[12px] rounded-tl-[12px] size-full" src="9d5a3ae09b1d217a9cdb8a9a8a7a0a1a709fc791.png" />
          <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0 rounded-bl-[12px] rounded-tl-[12px]" />
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute inset-[42.86%_73.85%_54.34%_24.53%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.0028 30.3138">
        <g id="Group 27674">
          <path d={svgPaths.p3a54d380} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p167f4180} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p13794100} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p30d6c300} fill="var(--fill-0, white)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents left-[450px] top-[442px]">
      <div className="absolute left-[450px] rounded-bl-[12px] rounded-tl-[12px] size-[72px] top-[442px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-bl-[12px] rounded-tl-[12px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-bl-[12px] rounded-tl-[12px] size-full" src="a4f792bd264e76c90bfe0c8abc0f194324bf75aa.png" />
          <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0 rounded-bl-[12px] rounded-tl-[12px]" />
        </div>
      </div>
      <Group19 />
    </div>
  );
}

function AddNewButton() {
  return (
    <div className="absolute bg-white content-stretch flex h-[37px] items-center justify-center left-[1597px] rounded-[99px] top-[83px] w-[217px]" data-name="Add new button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[14px] text-black text-center text-nowrap tracking-[1px]">
        <p className="leading-[normal]">Add New Community</p>
      </div>
    </div>
  );
}

function Scrim() {
  return <div className="absolute bg-[rgba(202,185,153,0.75)] h-[1080px] left-0 top-[-3px] w-[1919px]" data-name="Scrim" />;
}

function AlphaPicker() {
  return (
    <div className="absolute inset-[57.85%_7.11%_38.02%_21.33%]" data-name="AlphaPicker">
      <div className="absolute h-[10px] left-0 top-0 w-[161px]" data-name="hue-slider-track">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 161 10">
          <path d={svgPaths.p21f35900} fill="url(#paint0_linear_87_2231)" id="hue-slider-track" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_87_2231" x1="161" x2="5.09729e-09" y1="9.99994" y2="9.99994">
              <stop stopColor="#F00000" />
              <stop offset="0.046875" stopColor="#FF005E" />
              <stop offset="0.046975" stopColor="#FC0072" />
              <stop offset="0.0885417" stopColor="#EA00FA" />
              <stop offset="0.0886417" stopColor="#E000FB" />
              <stop offset="0.130208" stopColor="#9A00FF" />
              <stop offset="0.182292" stopColor="#3100FF" />
              <stop offset="0.182392" stopColor="#2D01FF" />
              <stop offset="0.234375" stopColor="#060CFF" />
              <stop offset="0.234475" stopColor="#0431FF" />
              <stop offset="0.28125" stopColor="#007CFF" />
              <stop offset="0.333333" stopColor="#008EFF" />
              <stop offset="0.385417" stopColor="#228BDE" />
              <stop offset="0.432292" stopColor="#00DBFF" />
              <stop offset="0.479167" stopColor="#00F5FF" />
              <stop offset="0.536458" stopColor="#00FFB5" />
              <stop offset="0.583333" stopColor="#00FF68" />
              <stop offset="0.640625" stopColor="#00FF22" />
              <stop offset="0.692708" stopColor="#2AFF00" />
              <stop offset="0.739583" stopColor="#ACFF00" />
              <stop offset="0.786458" stopColor="#F0F600" />
              <stop offset="0.833333" stopColor="#FFC300" />
              <stop offset="0.885417" stopColor="#FF8100" />
              <stop offset="0.947917" stopColor="#FF4F00" />
              <stop offset="1" stopColor="#FF0000" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bg-[#f8f8f8] left-[65px] rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0)] size-[12px] top-[-1px]" />
    </div>
  );
}

function HuePicker() {
  return (
    <div className="absolute inset-[65.29%_7.11%_30.58%_21.33%]" data-name="HuePicker">
      <div className="absolute flex h-[10px] items-center justify-center left-0 top-0 w-[161px]" style={{ "--transform-inner-width": "10", "--transform-inner-height": "161" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg]">
          <div className="h-[161px] relative w-[10px]" data-name="opacity-slider-track">
            <img alt="" className="block max-w-none size-full" height="161" src={imgOpacitySliderTrack} width="10" />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#f8f8f8] left-[149px] rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0)] size-[12px] top-[-1px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute left-[187px] size-[26px] top-[196px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="Frame">
          <path d={svgPaths.p1f5e8900} fill="var(--fill-0, #333333)" id="Vector" />
          <path d={svgPaths.p1c398600} fill="var(--fill-0, #333333)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function InputValue() {
  return (
    <div className="absolute left-[16px] rounded-[2px] top-[184px]" data-name="Input Value">
      <div className="content-stretch flex items-start overflow-clip px-[58px] py-[6px] relative rounded-[inherit]">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[11px] relative shrink-0 text-[11px] text-black text-center text-nowrap uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
          #abba30
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#6e6e6e] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_0px_0px_1px_rgba(218,218,218,0.25)]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[242px] left-0 top-0 w-[225px]">
      <AlphaPicker />
      <HuePicker />
      <Frame2 />
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal leading-[11px] left-[96.5px] text-[#969696] text-[11px] text-center top-[218px] translate-x-[-50%] uppercase w-[23px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        hex
      </p>
      <div className="absolute left-[16px] size-[16px] top-[146px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" fill="var(--fill-0, #ABBA30)" id="Ellipse 30" r="8" />
        </svg>
      </div>
      <InputValue />
    </div>
  );
}

function Color() {
  return (
    <div className="absolute h-[124px] left-0 top-0 w-[225px]" data-name="_Color">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 225 124">
        <g id="_Color">
          <rect fill="#ABBA30" height="124" width="225" />
          <rect fill="url(#paint0_linear_87_2010)" height="124" width="225" />
          <rect fill="url(#paint1_linear_87_2010)" height="124" width="225" />
          <g filter="url(#filter0_di_87_2010)" id="Picker">
            <circle cx="171" cy="80" r="5" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="20" id="filter0_di_87_2010" width="20" x="161" y="74">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_87_2010" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_87_2010" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="erode" radius="4" result="effect2_innerShadow_87_2010" />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
            <feBlend in2="shape" mode="normal" result="effect2_innerShadow_87_2010" />
          </filter>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_87_2010" x1="112.5" x2="112.5" y1="0" y2="124">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_87_2010" x1="0" x2="135.481" y1="0" y2="89.0291">
            <stop stopColor="white" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ColorPicker() {
  return (
    <div className="absolute bg-white inset-[36.59%_30.78%_29.61%_50.04%] shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)]" data-name="Color Picker">
      <Frame3 />
      <Color />
    </div>
  );
}

function BackgroundGlows() {
  return (
    <div className="absolute h-[391.399px] left-[calc(50%-0.31px)] top-[55.61px] translate-x-[-50%] w-[160.739px]" data-name="Background Glows">
      <div className="absolute inset-[-20.22%_-49.23%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 319.005 549.665">
          <g id="Background Glows">
            <g filter="url(#filter0_f_87_2070)" id="Ellipse 7" opacity="0.2">
              <circle cx="159.502" cy="390.163" fill="var(--fill-0, #CFA4F7)" r="80.3695" />
            </g>
            <g filter="url(#filter1_f_87_2070)" id="Ellipse 6" opacity="0.2">
              <circle cx="159.503" cy="159.502" fill="var(--fill-0, #9BE8DC)" r="80.3695" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="319.005" id="filter0_f_87_2070" width="319.005" x="1.76641e-06" y="230.66">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_87_2070" stdDeviation="39.5665" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="319.005" id="filter1_f_87_2070" width="319.005" x="9.91821e-05" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_87_2070" stdDeviation="39.5665" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function NameField2() {
  return (
    <div className="absolute bg-[#ebeef1] content-stretch flex flex-col h-[57.495px] items-start left-[58.11px] overflow-clip pb-[6.182px] pl-[14.837px] pr-[6.182px] pt-[9.892px] rounded-[14.837px] top-[174.34px] w-[173.722px]" data-name="Name Field 3">
      <div className="flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f363c] text-[8.655px] text-center text-nowrap">
        <p className="leading-[1.3]">Lastname</p>
      </div>
    </div>
  );
}

function NameField() {
  return (
    <div className="absolute bg-[#ebeef1] content-stretch flex flex-col h-[57.495px] items-start left-0 overflow-clip pb-[6.182px] pl-[14.837px] pr-[6.182px] pt-[9.892px] rounded-[14.837px] top-[116.23px] w-[173.722px]" data-name="Name Field 1">
      <div className="flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f363c] text-[8.655px] text-center text-nowrap">
        <p className="leading-[1.3]">First name</p>
      </div>
    </div>
  );
}

function LargeRingedCircle() {
  return (
    <div className="absolute left-[-82.22px] size-[222.562px] top-[406.79px]" data-name="Large ringed circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 222.562 222.562">
        <g id="Large ringed circle">
          <path clipRule="evenodd" d={svgPaths.p113e7f80} fill="var(--fill-0, #DC8A90)" fillRule="evenodd" id="5 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.pbbcab80} fill="var(--fill-0, #9BE8DC)" fillRule="evenodd" id="4 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p2161ea80} fill="var(--fill-0, #6387D0)" fillRule="evenodd" id="3 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p29fc9992} fill="var(--fill-0, #FFD686)" fillRule="evenodd" id="2 (Stroke)" />
          <path d={svgPaths.p279f0f00} fill="var(--fill-0, #6387D0)" id="1" />
        </g>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents left-[-82.22px] top-[406.79px]">
      <LargeRingedCircle />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex h-[57.495px] items-center left-0 px-[19.783px] py-[9.892px] top-[58.11px] w-[173.722px]">
      <div className="flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14.837px] text-nowrap text-white">
        <p className="leading-[normal]">Tell us your name</p>
      </div>
    </div>
  );
}

function EmailField() {
  return <div className="absolute bg-[#a9b0b7] content-stretch flex flex-col gap-[1.855px] items-start left-[116.23px] overflow-clip pb-[6.182px] pl-[19.783px] pr-[6.182px] pt-[9.892px] rounded-[617.608px] size-[57.495px] top-[348.68px]" data-name="Email Field" />;
}

function Halves() {
  return (
    <div className="absolute left-0 size-[115.608px] top-[290.57px]" data-name="Halves">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115.608 115.608">
        <g id="Halves">
          <path clipRule="evenodd" d={svgPaths.p3d37d00} fill="var(--fill-0, #6387D0)" fillRule="evenodd" id="Subtract" />
          <path clipRule="evenodd" d={svgPaths.p2de3700} fill="var(--fill-0, #6387D0)" fillRule="evenodd" id="Subtract_2" />
        </g>
      </svg>
    </div>
  );
}

function Ring() {
  return (
    <div className="absolute left-[116.23px] size-[57.495px] top-[290.57px]" data-name="Ring 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.4951 57.4951">
        <g id="Ring 1">
          <path clipRule="evenodd" d={svgPaths.p23135100} fill="var(--fill-0, #DC8A90)" fillRule="evenodd" id="Rectangle 3595 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Diamond() {
  return (
    <div className="absolute h-[115.608px] left-[116.84px] top-[464.91px] w-[114.365px]" data-name="Diamond 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114.365 115.608">
        <g id="Diamond 2">
          <path d={svgPaths.p325b9200} fill="var(--fill-0, #FFD686)" id="Arrow" />
          <path d={svgPaths.pcfc2500} fill="var(--fill-0, #FFD686)" id="Arrow_2" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}

function Next2() {
  return <div className="absolute bg-[#cfa4f7] left-[116.23px] overflow-clip rounded-[617.608px] size-[57.495px] top-[406.79px]" data-name="Next 2" />;
}

function Next4() {
  return (
    <div className="absolute bg-[#9be8dc] content-stretch flex flex-col h-[57.495px] items-center justify-center left-[231.83px] overflow-clip rounded-[617.608px] top-[58.11px] w-[115.608px]" data-name="Next 4">
      <div className="flex flex-col font-['Komet_Pro_Heavy:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.983px] text-center text-nowrap">
        <p className="leading-[1.3]">Next</p>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="h-[27.82px] relative w-[28.438px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.4384 27.8202">
        <g id="Group 27492">
          <path d={svgPaths.p485c1f1} fill="var(--fill-0, #094549)" id="User Image" />
        </g>
      </svg>
    </div>
  );
}

function Group11() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid mix-blend-hard-light ml-[calc(50%-14.22px)] mt-0 opacity-60 place-items-start relative">
      <div className="[grid-area:1_/_1] flex h-[27.82px] items-center justify-center ml-[calc(50%-14.22px)] mt-0 relative w-[28.438px]">
        <div className="flex-none rotate-[180deg]">
          <Group9 />
        </div>
      </div>
    </div>
  );
}

function LineSystemArrowLeftLine() {
  return (
    <div className="overflow-clip relative size-[14.837px]" data-name="line/system/arrow-left-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8374 14.8374">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pebc7b71} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[6.8px] mt-[6.8px] place-items-start relative" data-name="Header">
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-0 mt-0 relative size-[14.837px]">
        <div className="flex-none rotate-[180deg]">
          <LineSystemArrowLeftLine />
        </div>
      </div>
    </div>
  );
}

function ArrowBack() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[45.7px] mt-0 opacity-0 place-items-start relative" data-name="arrow back">
      <Group11 />
      <Header />
    </div>
  );
}

function Next() {
  return (
    <div className="[grid-area:1_/_1] h-[9.01px] ml-0 mt-[9.54px] relative w-[32.755px]" data-name="NEXT">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.7551 9.01003">
        <g id="NEXT">
          <path d={svgPaths.pba4fa00} fill="var(--fill-0, #2F363C)" id="Vector" opacity="0" />
          <path d={svgPaths.p3e801100} fill="var(--fill-0, #2F363C)" id="Vector_2" opacity="0" />
          <path d={svgPaths.pc10e900} fill="var(--fill-0, #2F363C)" id="Vector_3" opacity="0" />
          <path d={svgPaths.p320d6e80} fill="var(--fill-0, #2F363C)" id="Vector_4" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function Group16() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <ArrowBack />
      <Next />
    </div>
  );
}

function Next1() {
  return (
    <div className="absolute bg-[#cfa4f7] content-stretch flex h-[57.495px] items-center left-[116.23px] overflow-clip pl-[14.837px] pr-0 py-0 rounded-[617.608px] top-[232.45px] w-[115.608px]" data-name="Next 1">
      <Group16 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute left-[19.17px] size-[19.165px] top-[193.5px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.165 19.1651">
        <g id="Group 27556">
          <path clipRule="evenodd" d={svgPaths.p1b0e5c80} fill="var(--fill-0, #9BE8DC)" fillOpacity="0.2" fillRule="evenodd" id="Progress 3 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function BitsAndPieces() {
  return (
    <div className="absolute h-[812.35px] left-0 top-[37.71px] w-[231.835px]" data-name="Bits and Pieces">
      <NameField2 />
      <NameField />
      <div className="absolute flex items-center justify-center left-[174.34px] size-[57.495px] top-[116.23px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="relative size-[57.495px]" data-name="Quarter">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(99, 135, 208, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.4951 57.4951">
                <g id="Quarter">
                  <path d={svgPaths.p2d194b00} fill="var(--fill-0, #6387D0)" />
                  <path d={svgPaths.p3e2f5700} fill="var(--fill-0, #6387D0)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group13 />
      <div className="absolute flex items-center justify-center left-[58.11px] size-[57.495px] top-[232.45px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="bg-[#ffd686] rounded-tl-[617.608px] size-[57.495px]" />
        </div>
      </div>
      <div className="absolute bg-[#dc8a90] left-0 rounded-tl-[617.608px] size-[57.495px] top-[232.45px]" />
      <Frame13 />
      <div className="absolute flex items-center justify-center left-[173.1px] size-[115.608px] top-[291.18px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[115.608px]" data-name="Circular 2">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(207, 164, 247, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115.608 115.608">
                <path clipRule="evenodd" d={svgPaths.p27996e00} fill="var(--fill-0, #CFA4F7)" fillRule="evenodd" id="Circular 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <EmailField />
      <Halves />
      <Ring />
      <Diamond />
      <div className="absolute h-[57.495px] left-[232.45px] top-[116.23px] w-[114.372px]" data-name="Subtract">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(220, 138, 144, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114.372 57.4951">
            <g id="Subtract">
              <path d={svgPaths.p323b2ff2} fill="var(--fill-0, #DC8A90)" />
              <path d={svgPaths.pc1f95f0} fill="var(--fill-0, #DC8A90)" />
            </g>
          </svg>
        </div>
      </div>
      <Next2 />
      <div className="absolute right-0 size-[57.495px] top-[406.79px]" data-name="Progress 2">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(169, 176, 183, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.4951 57.4951">
            <circle cx="28.7475" cy="28.7475" fill="var(--fill-0, #A9B0B7)" id="Progress 2" r="28.7475" />
          </svg>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[82.97px] size-[65.885px] top-[-100.02px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[65.885px]" data-name="Circular 1">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(207, 164, 247, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65.8848 65.8848">
                <path clipRule="evenodd" d={svgPaths.p11795700} fill="var(--fill-0, #CFA4F7)" fillRule="evenodd" id="Circular 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Next4 />
      <Next1 />
      <Group15 />
    </div>
  );
}

function ElementsSignal() {
  return (
    <div className="absolute h-[7.419px] right-[34.82px] top-1/2 translate-y-[-50%] w-[12.346px]" data-name="Elements / Signal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3467 7.41895">
        <g id="Elements / Signal">
          <path d={svgPaths.p2db15900} fill="var(--fill-0, white)" id="Cellular Connection" />
        </g>
      </svg>
    </div>
  );
}

function ElementsConnection() {
  return (
    <div className="absolute h-[7.728px] right-[20.61px] top-1/2 translate-y-[-50%] w-[10.51px]" data-name="Elements / Connection">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5099 7.72788">
        <g id="Elements / Connection">
          <path d={svgPaths.p218b2600} fill="var(--fill-0, white)" id="Wifi" />
        </g>
      </svg>
    </div>
  );
}

function ElementsBattery() {
  return (
    <div className="absolute h-[8.037px] right-0 top-0 w-[16.896px]" data-name="Elements / Battery">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.8961 8.03695">
        <g clipPath="url(#clip0_87_2244)" id="Elements / Battery">
          <rect height="7.41872" id="Border" opacity="0.4" rx="2.16379" stroke="var(--stroke-0, white)" strokeWidth="0.618227" width="14.8374" x="0.309113" y="0.309113" />
          <path d={svgPaths.p33d5900} fill="var(--fill-0, white)" id="Cap" opacity="0.5" />
          <rect fill="var(--fill-0, white)" height="5.56404" id="Capacity" rx="1.23645" width="12.9828" x="1.23647" y="1.23643" />
        </g>
        <defs>
          <clipPath id="clip0_87_2244">
            <rect fill="white" height="8.03695" width="16.8961" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Indicators() {
  return (
    <div className="absolute h-[8.037px] right-[11.56px] top-[14.22px] w-[48.408px]" data-name="Indicators">
      <ElementsSignal />
      <ElementsConnection />
      <ElementsBattery />
    </div>
  );
}

function MicCam() {
  return (
    <div className="absolute left-[174.34px] size-[3.709px] top-[3.71px]" data-name="Mic & Cam">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.70936 3.70936">
        <g id="Mic & Cam">
          <g id="Mic/Cam Indicator" />
        </g>
      </svg>
    </div>
  );
}

function ElementsTime() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(50%-82.22px)] top-[calc(50%+3.4px)] translate-x-[-50%] translate-y-[-50%]" data-name="Elements / Time">
      <div className="flex flex-col font-['Komet:Medium_SC_Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10.51px] text-center text-nowrap text-white tracking-[-0.3091px]">
        <p className="leading-[10.51px]">09:41</p>
      </div>
    </div>
  );
}

function StatusBarIPhone13Mini() {
  return (
    <div className="absolute h-[29.675px] left-1/2 overflow-clip top-0 translate-x-[-50%] w-[231.835px]" data-name="Status Bar / iPhone 13 Mini">
      <Indicators />
      <MicCam />
      <ElementsTime />
    </div>
  );
}

function Welcome() {
  return (
    <div className="absolute contents left-[30.91px] top-[281.91px]" data-name="welcome">
      <p className="absolute font-['Komet_Pro_Medium:Medium',sans-serif] leading-[14.837px] left-[114.68px] not-italic text-[11.128px] text-[rgba(255,255,255,0)] text-center top-[281.91px] translate-x-[-50%] w-[167.539px]">Space for a customised message depending on the users journey</p>
    </div>
  );
}

function NoChange() {
  return (
    <div className="h-[7.419px] relative w-[7.339px]" data-name="No Change">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33907 7.41877">
        <g id="No Change">
          <path d={svgPaths.p33dbdc00} fill="var(--fill-0, #CFA4F7)" id="Arrow" />
          <path d={svgPaths.p2e6dec00} fill="var(--fill-0, #CFA4F7)" id="Arrow_2" opacity="0.15" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[rgba(169,96,239,0.2)] content-stretch flex gap-[2.473px] items-center left-[9.89px] p-[4.946px] rounded-[61.204px] top-[32.77px]" data-name="<>">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <NoChange />
        </div>
      </div>
      <div className="flex flex-col font-['Komet_Pro_Medium:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8.655px] text-white w-[19px]">
        <p className="leading-[9.892px]">Back</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[45.996px] relative shrink-0 w-[7.419px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.41875 45.9961">
        <g id="Frame 49285">
          <circle cx="3.70936" cy="9.64433" fill="var(--fill-0, white)" id="Ellipse 21" r="3.70936" />
          <circle cx="3.70936" cy="22.9979" fill="var(--fill-0, white)" fillOpacity="0.3" id="Ellipse 22" r="3.70936" />
          <circle cx="3.70936" cy="36.3517" fill="var(--fill-0, white)" fillOpacity="0.3" id="Ellipse 23" r="3.70936" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[14.837px] pr-[1.236px] py-0 relative size-[57.495px]">
      <Frame15 />
    </div>
  );
}

function Onboarding() {
  return (
    <div className="absolute bg-[#0a0f1a] h-[502px] left-[298.37px] overflow-clip rounded-[19.783px] top-[147px] w-[231.835px]" data-name="Onboarding 1">
      <BackgroundGlows />
      <BitsAndPieces />
      <div className="absolute h-[502px] left-0 mix-blend-multiply top-0 w-[231.835px]" data-name="Scrim">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 231.835 502">
          <g id="Scrim" style={{ mixBlendMode: "multiply" }}>
            <path d="M0 0H231.835V502H0V0Z" fill="url(#paint0_linear_87_2175)" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_87_2175" x1="115.917" x2="115.917" y1="0" y2="502">
              <stop stopColor="#2B353C" />
              <stop offset="0.307292" stopColor="#2B353C" stopOpacity="0" />
              <stop offset="0.65625" stopColor="#2B353C" stopOpacity="0" />
              <stop offset="1" stopColor="#2B353C" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[-204px] h-[205.241px] left-0 w-[231.835px]" data-name="Login Panel">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(47, 54, 60, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 231.835 205.241">
            <path d={svgPaths.p34126e80} fill="var(--fill-0, #2F363C)" id="Login Panel" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-repeat bg-size-[97.67979383468628px_97.67979383468628px] bg-top-left h-[502px] left-0 mix-blend-color-dodge top-0 w-[231.835px]" data-name="Paper Texture" style={{ backgroundImage: "url('7e4d4fa712baab7d5452a8dcb170b6d0e38ee430.png')" }} />
      <StatusBarIPhone13Mini />
      <Welcome />
      <Component />
      <div className="absolute flex items-center justify-center right-[85.93px] size-[57.495px] top-[22.87px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <Frame14 />
        </div>
      </div>
    </div>
  );
}

function BackgroundGlows1() {
  return (
    <div className="absolute h-[390.62px] left-[calc(50%-0.31px)] top-[55.5px] translate-x-[-50%] w-[160.419px]" data-name="Background Glows">
      <div className="absolute inset-[-20.22%_-49.23%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318.369 548.57">
          <g id="Background Glows">
            <g filter="url(#filter0_f_87_1971)" id="Ellipse 7" opacity="0.5">
              <circle cx="159.185" cy="389.386" fill="var(--fill-0, #CFA4F7)" r="80.2094" />
            </g>
            <g filter="url(#filter1_f_87_1971)" id="Ellipse 6" opacity="0.5">
              <circle cx="159.185" cy="159.185" fill="var(--fill-0, #9BE8DC)" r="80.2094" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="318.369" id="filter0_f_87_1971" width="318.369" x="1.80399e-05" y="230.201">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_87_1971" stdDeviation="39.4877" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="318.369" id="filter1_f_87_1971" width="318.369" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_87_1971" stdDeviation="39.4877" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute h-[27.765px] left-[calc(50%-132.35px)] mix-blend-hard-light opacity-60 top-[54.91px] translate-x-[-50%] w-[28.382px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.3818 27.7648">
        <g id="Group 27492">
          <ellipse cx="14.1909" cy="13.8824" fill="var(--fill-0, #CFA4F7)" id="User Image" rx="14.1909" ry="13.8824" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-[calc(50%-132.35px)] mix-blend-hard-light top-[54.91px] translate-x-[-50%]">
      <Group10 />
    </div>
  );
}

function LineSystemArrowLeftLine1() {
  return (
    <div className="absolute left-[-24.06px] overflow-clip size-[14.808px] top-[61.08px]" data-name="line/system/arrow-left-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8079 14.8079">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pb3d4500} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute contents left-[-24.06px] top-[61.08px]" data-name="Header">
      <LineSystemArrowLeftLine1 />
    </div>
  );
}

function ArrowBack1() {
  return (
    <div className="absolute contents left-[-30.85px] top-[54.91px]" data-name="arrow back">
      <Group12 />
      <Header1 />
    </div>
  );
}

function NameField3() {
  return <div className="absolute bg-[#cfa4f7] content-stretch flex flex-col gap-[1.851px] h-[57.381px] items-start left-[201.14px] overflow-clip pb-[6.17px] pl-[19.744px] pr-[6.17px] pt-[9.872px] rounded-[616.378px] top-[173.38px] w-[173.376px]" data-name="Name Field 3" />;
}

function NameField1() {
  return <div className="absolute bg-[#ffd686] content-stretch flex flex-col gap-[1.851px] h-[57.381px] items-start left-[-116px] overflow-clip pb-[6.17px] pl-[19.744px] pr-[6.17px] pt-[9.872px] rounded-[616.378px] top-[116px] w-[173.376px]" data-name="Name Field 1" />;
}

function LargeRingedCircle1() {
  return (
    <div className="absolute left-[-82.06px] size-[222.118px] top-[405.98px]" data-name="Large ringed circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 222.118 222.118">
        <g id="Large ringed circle">
          <path clipRule="evenodd" d={svgPaths.pa2db000} fill="var(--fill-0, #DC8A90)" fillRule="evenodd" id="5 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p33535500} fill="var(--fill-0, #DC8A90)" fillRule="evenodd" id="4 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p31aaa200} fill="var(--fill-0, #6387D0)" fillRule="evenodd" id="3 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p32e32500} fill="var(--fill-0, #FFD686)" fillRule="evenodd" id="2 (Stroke)" />
          <path d={svgPaths.p1c54780} fill="var(--fill-0, #6387D0)" id="1" />
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents left-[-82.06px] top-[405.98px]">
      <LargeRingedCircle1 />
    </div>
  );
}

function Next3() {
  return <div className="absolute bg-[#dc8a90] content-stretch flex flex-col h-[57.381px] items-center justify-center left-[116px] overflow-clip rounded-tl-[616.378px] rounded-tr-[616.378px] top-[405.98px] w-[115.378px]" data-name="Next 3" />;
}

function Next5() {
  return (
    <div className="absolute bg-[#cfa4f7] content-stretch flex flex-col h-[57.381px] items-center justify-center left-[116px] overflow-clip rounded-[616.378px] top-[231.99px] w-[115.378px]" data-name="Next 1">
      <div className="flex flex-col font-['Komet_Pro_Heavy:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.957px] text-center text-nowrap">
        <p className="leading-[1.3]">Next</p>
      </div>
    </div>
  );
}

function Next6() {
  return (
    <div className="absolute bg-[#9be8dc] content-stretch flex flex-col h-[57.381px] items-center justify-center left-[116px] overflow-clip rounded-[616.378px] top-[58px] w-[115.378px]" data-name="Next 4">
      <div className="flex flex-col font-['Komet_Pro_Heavy:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.957px] text-center text-nowrap">
        <p className="leading-[1.3]">Next</p>
      </div>
    </div>
  );
}

function EmailField1() {
  return <div className="absolute bg-[#a9b0b7] content-stretch flex flex-col gap-[1.851px] items-start left-[116px] overflow-clip pb-[6.17px] pl-[19.744px] pr-[6.17px] pt-[9.872px] rounded-[616.378px] size-[57.381px] top-[347.99px]" data-name="Email Field" />;
}

function Halves1() {
  return (
    <div className="absolute left-0 size-[115.378px] top-[289.99px]" data-name="Halves">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115.378 115.378">
        <g id="Halves">
          <path clipRule="evenodd" d={svgPaths.p37edf8f0} fill="var(--fill-0, #6387D0)" fillRule="evenodd" id="Subtract" />
          <path clipRule="evenodd" d={svgPaths.p2447d680} fill="var(--fill-0, #6387D0)" fillRule="evenodd" id="Subtract_2" />
        </g>
      </svg>
    </div>
  );
}

function Ring1() {
  return (
    <div className="absolute left-[116px] size-[57.381px] top-[289.99px]" data-name="Ring 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.3805 57.3805">
        <g id="Ring 1">
          <path clipRule="evenodd" d={svgPaths.p3ba92780} fill="var(--fill-0, #DC8A90)" fillRule="evenodd" id="Rectangle 3595 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Diamond1() {
  return (
    <div className="absolute h-[115.378px] left-[116.61px] top-[463.98px] w-[114.137px]" data-name="Diamond 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114.137 115.378">
        <g id="Diamond 2">
          <path d={svgPaths.p1dbe5800} fill="var(--fill-0, #FFD686)" id="Arrow" />
          <path d={svgPaths.p3ad7eb80} fill="var(--fill-0, #FFD686)" id="Arrow_2" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}

function Ring2() {
  return (
    <div className="absolute left-[58px] size-[57.381px] top-[58px]" data-name="Ring 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.3805 57.3805">
        <g id="Ring 1">
          <path clipRule="evenodd" d={svgPaths.p3ba92780} fill="var(--fill-0, #DC8A90)" fillRule="evenodd" id="Rectangle 3595 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function BitsAndPieces1() {
  return (
    <div className="absolute h-[810.732px] left-0 top-[37.64px] w-[231.373px]" data-name="Bits and Pieces">
      <NameField3 />
      <NameField1 />
      <div className="absolute flex items-center justify-center left-[58px] size-[57.381px] top-[116px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="relative size-[57.381px]" data-name="Quarter">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(99, 135, 208, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.3805 57.3805">
                <g id="Quarter">
                  <path d={svgPaths.p1de1b871} fill="var(--fill-0, #6387D0)" />
                  <path d={svgPaths.p219fd400} fill="var(--fill-0, #6387D0)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group14 />
      <Next3 />
      <div className="absolute flex items-center justify-center left-[58px] size-[57.381px] top-[231.99px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="bg-[#ffd686] rounded-tl-[616.378px] size-[57.381px]" />
        </div>
      </div>
      <div className="absolute bg-[#dc8a90] left-0 rounded-tl-[616.378px] size-[57.381px] top-[231.99px]" />
      <Next5 />
      <Next6 />
      <div className="absolute flex items-center justify-center left-[-27.76px] size-[57.381px] top-[173.99px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[57.381px]" data-name="Progress 1">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(207, 164, 247, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57.3805 57.3805">
                <circle cx="28.6903" cy="28.6903" fill="var(--fill-0, #CFA4F7)" id="Progress 1" r="28.6903" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[172.76px] size-[115.378px] top-[290.6px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[115.378px]" data-name="Circular 2">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(207, 164, 247, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115.378 115.378">
                <path clipRule="evenodd" d={svgPaths.p30a3c00} fill="var(--fill-0, #CFA4F7)" fillRule="evenodd" id="Circular 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <EmailField1 />
      <Halves1 />
      <Ring1 />
      <Diamond1 />
      <div className="absolute h-[57.381px] left-[116.61px] top-[116px] w-[114.144px]" data-name="Subtract">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(220, 138, 144, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114.144 57.3805">
            <g id="Subtract">
              <path d={svgPaths.p18c11100} fill="var(--fill-0, #DC8A90)" />
              <path d={svgPaths.p18a1d500} fill="var(--fill-0, #DC8A90)" />
            </g>
          </svg>
        </div>
      </div>
      <Ring2 />
      <div className="absolute flex items-center justify-center left-0 size-[57.381px] top-[58px]">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-[#6387d0] rounded-tl-[616.378px] size-[57.381px]" />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-0 size-[169.057px] top-[-117.85px]">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[169.057px]" data-name="Circular 1">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(207, 164, 247, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 169.057 169.057">
                <path clipRule="evenodd" d={svgPaths.p218df000} fill="var(--fill-0, #CFA4F7)" fillRule="evenodd" id="Circular 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DontMove() {
  return (
    <div className="absolute h-[41.339px] left-[168.44px] top-[47.51px] w-[46.275px]" data-name="don\'t move">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.2747 41.3387">
        <g id="don\'t move">
          <path d={svgPaths.p3f15300} fill="var(--fill-0, #FFD686)" id="Arrow" />
          <path d={svgPaths.p1088c000} fill="var(--fill-0, #FFD686)" id="Arrow_2" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonFullColour() {
  return (
    <div className="absolute h-[37.02px] left-[17.28px] top-[376.37px] w-[197.438px]" data-name="Button Full Colour">
      <div className="absolute bg-[#cfa4f7] inset-[11.11%_2.12%] rounded-[61.083px]" data-name="Pulse" />
      <div className="absolute bg-[#cfa4f7] inset-[11.11%_2.12%] rounded-[61.083px]" data-name="Button" />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] inset-[12.22%_2.12%_16.67%_2.12%] justify-center leading-[0] not-italic text-[#2f363c] text-[11.106px] text-center">
        <p className="leading-[1.3]">Sign up</p>
      </div>
    </div>
  );
}

function ButtonFullColour1() {
  return (
    <div className="absolute h-[37.02px] left-[17.28px] top-[415.85px] w-[197.438px]" data-name="Button Full Colour">
      <div className="absolute bg-[#cfa4f7] inset-[11.11%_2.12%] rounded-[61.083px]" data-name="Pulse" />
      <div className="absolute bg-[#ebeef1] inset-[11.11%_2.12%] rounded-[61.083px]" data-name="Button" />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] inset-[12.22%_2.12%_16.67%_2.12%] justify-center leading-[0] not-italic text-[#1d2024] text-[11.106px] text-center">
        <p className="leading-[1.3]">Log in</p>
      </div>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents left-[17.28px] top-[376.37px]">
      <ButtonFullColour />
      <ButtonFullColour1 />
    </div>
  );
}

function ElementsSignal1() {
  return (
    <div className="absolute h-[7.404px] right-[34.76px] top-1/2 translate-y-[-50%] w-[12.322px]" data-name="Elements / Signal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3218 7.4043">
        <g id="Elements / Signal">
          <path d={svgPaths.p1caf1b00} fill="var(--fill-0, white)" id="Cellular Connection" />
        </g>
      </svg>
    </div>
  );
}

function ElementsConnection1() {
  return (
    <div className="absolute h-[7.712px] right-[20.56px] top-1/2 translate-y-[-50%] w-[10.489px]" data-name="Elements / Connection">
      <div className="absolute inset-[0_0_-0.01%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.4893 7.71289">
          <g id="Elements / Connection">
            <path d={svgPaths.p3c5c7580} fill="var(--fill-0, white)" id="Wifi" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ElementsBattery1() {
  return (
    <div className="absolute h-[8.021px] right-0 top-0 w-[16.862px]" data-name="Elements / Battery">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.8625 8.02094">
        <g clipPath="url(#clip0_87_1917)" id="Elements / Battery">
          <rect height="7.40394" id="Border" opacity="0.4" rx="2.15948" stroke="var(--stroke-0, white)" strokeWidth="0.616995" width="14.8079" x="0.308498" y="0.308498" />
          <path d={svgPaths.p370ce110} fill="var(--fill-0, white)" id="Cap" opacity="0.5" />
          <rect fill="var(--fill-0, white)" height="5.55296" id="Capacity" rx="1.23399" width="12.9569" x="1.2339" y="1.23396" />
        </g>
        <defs>
          <clipPath id="clip0_87_1917">
            <rect fill="white" height="8.02094" width="16.8625" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Indicators1() {
  return (
    <div className="absolute h-[8.021px] right-[11.54px] top-[14.19px] w-[48.311px]" data-name="Indicators">
      <ElementsSignal1 />
      <ElementsConnection1 />
      <ElementsBattery1 />
    </div>
  );
}

function MicCam1() {
  return (
    <div className="absolute left-[173.99px] size-[3.702px] top-[3.7px]" data-name="Mic & Cam">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.70197 3.70197">
        <g id="Mic & Cam">
          <g id="Mic/Cam Indicator" />
        </g>
      </svg>
    </div>
  );
}

function ElementsTime1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[calc(50%-82.06px)] top-[calc(50%+3.39px)] translate-x-[-50%] translate-y-[-50%]" data-name="Elements / Time">
      <div className="flex flex-col font-['Komet:Medium_SC_Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10.489px] text-center text-nowrap text-white tracking-[-0.3085px]">
        <p className="leading-[10.489px]">09:41</p>
      </div>
    </div>
  );
}

function StatusBarIPhone13Mini1() {
  return (
    <div className="absolute h-[29.616px] left-1/2 overflow-clip top-0 translate-x-[-50%] w-[231.373px]" data-name="Status Bar / iPhone 13 Mini">
      <Indicators1 />
      <MicCam1 />
      <ElementsTime1 />
    </div>
  );
}

function SplashLoginSignUp() {
  return (
    <div className="absolute bg-[#0a0f1a] h-[501px] left-[43px] overflow-clip rounded-[19.744px] top-[147px] w-[231.373px]" data-name="Splash Login/Sign up">
      <BackgroundGlows1 />
      <ArrowBack1 />
      <BitsAndPieces1 />
      <DontMove />
      <div className="absolute bg-[rgba(0,0,0,0.6)] inset-0" data-name="Scrim" />
      <div className="absolute bottom-[-0.31px] h-[184.79px] left-0 w-[231.373px]" data-name="Login Panel">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(47, 54, 60, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 231.373 184.79">
            <path d={svgPaths.p384dcb80} fill="var(--fill-0, #2F363C)" id="Login Panel" />
          </svg>
        </div>
      </div>
      <Group32 />
      <StatusBarIPhone13Mini1 />
      <div className="absolute h-[812px] left-0 mix-blend-color-dodge top-0 w-[375px]" data-name="Paper Texture">
        <div aria-hidden="true" className="absolute bg-repeat bg-size-[157.99999237060547px_157.99999237060547px] bg-top-left inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: "url('7e4d4fa712baab7d5452a8dcb170b6d0e38ee430.png')" }} />
      </div>
      <div className="absolute h-[56px] left-[calc(50%-0.19px)] top-[calc(50%-10.5px)] translate-x-[-50%] translate-y-[-50%] w-[209px]" data-name="Morabito Art Villa White Logo New (1) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src="355bfeefb218b7b8ae36f72a5a7facfaee77d0aa.png" />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[18px] items-center relative shrink-0">
      <div className="bg-[#dc8a90] relative rounded-[5.467px] shrink-0 size-[57px]" data-name="Color">
        <div aria-hidden="true" className="absolute border-[#2f363c] border-[1.367px] border-solid inset-0 pointer-events-none rounded-[5.467px]" />
      </div>
      <div className="bg-[#cfa4f7] relative rounded-[5.467px] shrink-0 size-[41px]" data-name="Color">
        <div aria-hidden="true" className="absolute border-[#2f363c] border-[1.367px] border-solid inset-0 pointer-events-none rounded-[5.467px]" />
      </div>
      <div className="bg-[#6387d0] relative rounded-[5.467px] shrink-0 size-[41px]" data-name="Color">
        <div aria-hidden="true" className="absolute border-[#2f363c] border-[1.367px] border-solid inset-0 pointer-events-none rounded-[5.467px]" />
      </div>
      <div className="bg-[#ffd686] relative rounded-[5.467px] shrink-0 size-[41px]" data-name="Color">
        <div aria-hidden="true" className="absolute border-[#2f363c] border-[1.367px] border-solid inset-0 pointer-events-none rounded-[5.467px]" />
      </div>
      <div className="bg-[#9be8dc] relative rounded-[5.467px] shrink-0 size-[41px]" data-name="Color">
        <div aria-hidden="true" className="absolute border-[#2f363c] border-[1.367px] border-solid inset-0 pointer-events-none rounded-[5.467px]" />
      </div>
      <div className="bg-[#a9b0b7] relative rounded-[5.467px] shrink-0 size-[41px]" data-name="Color">
        <div aria-hidden="true" className="absolute border-[#2f363c] border-[1.367px] border-solid inset-0 pointer-events-none rounded-[5.467px]" />
      </div>
      <div className="bg-[#0a0f1a] relative rounded-[5.467px] shrink-0 size-[41px]" data-name="Color">
        <div aria-hidden="true" className="absolute border-[#2f363c] border-[1.367px] border-solid inset-0 pointer-events-none rounded-[5.467px]" />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[18px] items-start left-[587px] top-[119px]">
      <div className="flex flex-col font-['Komet_Pro_Regular:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2f363c] text-[14px] text-nowrap uppercase">
        <p className="leading-[24px]">Theme Colors</p>
      </div>
      <div className="flex flex-col font-['Komet_Pro_Regular:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(47,54,60,0.6)] w-full">
        <p className="leading-[24px]">Update the shape colors by selecting them below</p>
      </div>
      <Frame20 />
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents left-[587px] top-[119px]">
      <Frame19 />
    </div>
  );
}

function UserProfile() {
  return (
    <div className="absolute bg-[#f1ede5] h-[716px] left-0 overflow-clip rounded-[32px] top-[12px] w-[1173px]" data-name="User profile">
      <ColorPicker />
      <Onboarding />
      <SplashLoginSignUp />
      <div className="absolute flex flex-col font-['Komet_Pro_Regular:Regular',sans-serif] justify-center leading-[0] left-[43px] not-italic text-[#2f363c] text-[14px] text-nowrap top-[124px] translate-y-[-50%] uppercase">
        <p className="leading-[24px]">Color preview</p>
      </div>
      <Group31 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents left-0 top-[12px]">
      <UserProfile />
    </div>
  );
}

function Close() {
  return (
    <div className="absolute left-[10px] size-[24px] top-[10px]" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Close">
          <path d={svgPaths.p15433a70} fill="var(--fill-0, #2F363C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-white left-[1142px] overflow-clip rounded-[99px] size-[44px] top-0">
      <Close />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute contents font-['Komet_Pro_Bold:Bold',sans-serif] leading-[1.2] left-[42px] not-italic text-[21px] top-[54px]" data-name="Text">
      <p className="absolute h-[32.045px] left-[42px] text-[#2f363c] top-[54px] w-[283.355px]">Colour Palette</p>
      <p className="absolute left-[155px] text-nowrap text-white top-[56.11px]">{` `}</p>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute bottom-[28px] contents left-[975px]">
      <div className="absolute bg-[#65cb69] bottom-[28px] h-[52px] left-[975px] rounded-[99px] w-[151px]" />
      <div className="absolute bottom-[54px] flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[52px] justify-center leading-[0] left-[calc(50%+457.5px)] text-[#2f363c] text-[16px] text-center translate-x-[-50%] translate-y-[50%] w-[151px]">
        <p className="leading-[normal]">Save</p>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute bottom-[28px] contents left-[975px]">
      <Group25 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute h-[727px] left-1/2 top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[1186px]">
      <Group27 />
      <Frame17 />
      <Text />
      <Group26 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[0_0_2.16%_78.84%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4289 18.59">
        <g id="Group">
          <path d={svgPaths.p1b61f300} fill="var(--fill-0, #6387D0)" id="Vector" />
          <path d={svgPaths.p1b127a00} fill="var(--fill-0, #CFA4F7)" id="Vector_2" />
          <path d={svgPaths.p17fe8e80} fill="var(--fill-0, #9BE8DC)" id="Vector_3" />
          <path d={svgPaths.p210fd800} fill="var(--fill-0, #DC8A90)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[22.63%_12.07%_-0.01%_0]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.4838 14.7019">
        <g id="Group">
          <path d={svgPaths.p35fd6fc0} fill="var(--fill-0, #EBEEF1)" id="Vector" />
          <path d={svgPaths.p22657540} fill="var(--fill-0, #EBEEF1)" id="Vector_2" />
          <path d={svgPaths.p3602ef40} fill="var(--fill-0, #EBEEF1)" id="Vector_3" />
          <path d={svgPaths.p144481f0} fill="var(--fill-0, #EBEEF1)" id="Vector_4" />
          <path d={svgPaths.p19144700} fill="var(--fill-0, #EBEEF1)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[0_0_-0.01%_0]" data-name="Group">
      <Group4 />
      <Group5 />
    </div>
  );
}

function Extra() {
  return (
    <div className="absolute contents inset-[0_0_-0.01%_0]" data-name="extra">
      <Group3 />
    </div>
  );
}

function KyozoLight() {
  return (
    <div className="absolute inset-[74.07%_68.8%_24.17%_28.39%] overflow-clip" data-name="Kyozo light 2">
      <Extra />
    </div>
  );
}

function Welcome1() {
  return (
    <div className="absolute contents inset-[73.8%_71.82%_23.98%_23.91%]" data-name="welcome">
      <p className="absolute font-['Komet_Pro_Medium:Medium',sans-serif] inset-[73.8%_71.82%_23.98%_23.91%] leading-[24px] not-italic text-[14px] text-center text-white">Powered by</p>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[73.8%_68.8%_23.98%_23.91%]">
      <KyozoLight />
      <Welcome1 />
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents left-[367px] top-[177px]">
      <Frame18 />
      <Group33 />
    </div>
  );
}

export default function Admin1UserCommunityProfileColourPalette() {
  return (
    <div className="bg-[#f1ede5] relative size-full" data-name="Admin 1 - User - Community Profile - Colour Palette">
      <Group21 />
      <Group24 />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] left-[1078px] not-italic text-[#2f363c] text-[12px] text-nowrap top-[255.5px] translate-y-[-50%] uppercase">
        <p className="leading-[1.25]">Users</p>
      </div>
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] left-[1402px] not-italic text-[#2f363c] text-[12px] top-[255.5px] translate-y-[-50%] uppercase w-[64px]">
        <p className="leading-[1.25]">View/Edit</p>
      </div>
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] left-[1535px] not-italic text-[#2f363c] text-[12px] text-nowrap top-[255.5px] translate-y-[-50%] uppercase">
        <p className="leading-[1.25]">Remove</p>
      </div>
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] left-[448px] not-italic text-[#2f363c] text-[12px] top-[253.5px] translate-y-[-50%] uppercase w-[195px]">
        <p className="leading-[1.25]">Community name</p>
      </div>
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] left-[817px] not-italic text-[#2f363c] text-[12px] top-[252.5px] translate-y-[-50%] uppercase w-[106px]">
        <p className="leading-[1.25]">StaTUS</p>
      </div>
      <div className="absolute bg-[#e5ddce] h-[72px] left-[448px] rounded-[12px] top-[283px] w-[1149px]" />
      <Frame4 />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[72px] justify-center leading-[0] left-[1078px] not-italic text-[#2f363c] text-[16px] top-[319px] translate-y-[-50%] w-[90px]">
        <p className="leading-[normal]">556</p>
      </div>
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[72px] justify-center leading-[0] left-[539px] not-italic text-[#2f363c] text-[16px] top-[319px] translate-y-[-50%] w-[76px]">
        <p className="leading-[18px]">Spin Sum</p>
      </div>
      <Frame6 />
      <Status />
      <div className="absolute bg-[#e5ddce] h-[72px] left-[448px] rounded-[12px] top-[363px] w-[1149px]" />
      <Frame7 />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[72px] justify-center leading-[0] left-[1078px] not-italic text-[#2f363c] text-[16px] top-[399px] translate-y-[-50%] w-[90px]">
        <p className="leading-[normal]">556</p>
      </div>
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[72px] justify-center leading-[0] left-[539px] not-italic text-[#2f363c] text-[16px] top-[399px] translate-y-[-50%] w-[134px]">
        <p className="leading-[18px]">Suara Festival</p>
      </div>
      <Frame8 />
      <Status1 />
      <div className="absolute bg-[#e5ddce] h-[72px] left-[448px] rounded-[12px] top-[442px] w-[1149px]" />
      <Frame9 />
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[72px] justify-center leading-[0] left-[1078px] not-italic text-[#2f363c] text-[16px] top-[478px] translate-y-[-50%] w-[90px]">
        <p className="leading-[normal]">556</p>
      </div>
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] h-[72px] justify-center leading-[0] left-[539px] not-italic text-[#2f363c] text-[16px] top-[478px] translate-y-[-50%] w-[134px]">
        <p className="leading-[18px]">Savaya VIP Event</p>
      </div>
      <div className="absolute flex flex-col font-['Komet_Pro_Bold:Bold',sans-serif] justify-center leading-[0] left-[1276px] not-italic text-[#2f363c] text-[12px] top-[255.5px] translate-y-[-50%] uppercase w-[64px]">
        <p className="leading-[1.25]">View/Edit</p>
      </div>
      <Frame5 />
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Status2 />
      <div className="absolute left-[448px] rounded-bl-[12px] rounded-tl-[12px] size-[72px] top-[283px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-bl-[12px] rounded-tl-[12px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-bl-[12px] rounded-tl-[12px] size-full" src="f488520bf2184d653e449f26b2ffaaaffdb28c50.png" />
          <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0 rounded-bl-[12px] rounded-tl-[12px]" />
        </div>
      </div>
      <Group8 />
      <Group28 />
      <Group29 />
      <AddNewButton />
      <Scrim />
      <Group30 />
    </div>
  );
}