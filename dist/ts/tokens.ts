/**
 * Enterprise Design System - TypeScript Token Definitions
 */

export const DesignTokens = {
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "brand": {
      "placeholder-primary": {
        "50": {
          "$value": "#EFF6FF",
          "$type": "color",
          "$description": "Lightest tint for brand tint surfaces"
        },
        "100": {
          "$value": "#DBEAFE",
          "$type": "color"
        },
        "200": {
          "$value": "#BFDBFE",
          "$type": "color"
        },
        "300": {
          "$value": "#93C5FD",
          "$type": "color"
        },
        "400": {
          "$value": "#60A5FA",
          "$type": "color"
        },
        "500": {
          "$value": "#3B82F6",
          "$type": "color",
          "$description": "Base brand placeholder primary"
        },
        "600": {
          "$value": "#2563EB",
          "$type": "color"
        },
        "700": {
          "$value": "#1D4ED8",
          "$type": "color"
        },
        "800": {
          "$value": "#1E40AF",
          "$type": "color"
        },
        "900": {
          "$value": "#1E3A8A",
          "$type": "color"
        },
        "950": {
          "$value": "#172554",
          "$type": "color"
        }
      },
      "placeholder-secondary": {
        "50": {
          "$value": "#F5F3FF",
          "$type": "color"
        },
        "100": {
          "$value": "#EDE9FE",
          "$type": "color"
        },
        "500": {
          "$value": "#8B5CF6",
          "$type": "color",
          "$description": "Secondary brand accent placeholder"
        },
        "700": {
          "$value": "#6D28D9",
          "$type": "color"
        },
        "900": {
          "$value": "#4C1D95",
          "$type": "color"
        }
      }
    },
    "neutral": {
      "0": {
        "$value": "#FFFFFF",
        "$type": "color"
      },
      "50": {
        "$value": "#F8FAFC",
        "$type": "color"
      },
      "100": {
        "$value": "#F1F5F9",
        "$type": "color"
      },
      "200": {
        "$value": "#E2E8F0",
        "$type": "color"
      },
      "300": {
        "$value": "#CBD5E1",
        "$type": "color"
      },
      "400": {
        "$value": "#94A3B8",
        "$type": "color"
      },
      "500": {
        "$value": "#64748B",
        "$type": "color"
      },
      "600": {
        "$value": "#475569",
        "$type": "color"
      },
      "700": {
        "$value": "#334155",
        "$type": "color"
      },
      "800": {
        "$value": "#1E293B",
        "$type": "color"
      },
      "900": {
        "$value": "#0F172A",
        "$type": "color"
      },
      "950": {
        "$value": "#020617",
        "$type": "color"
      },
      "1000": {
        "$value": "#000000",
        "$type": "color"
      }
    },
    "status": {
      "success": {
        "light": {
          "$value": "#ECFDF5",
          "$type": "color"
        },
        "border": {
          "$value": "#A7F3D0",
          "$type": "color"
        },
        "base": {
          "$value": "#10B981",
          "$type": "color"
        },
        "dark": {
          "$value": "#065F46",
          "$type": "color"
        }
      },
      "warning": {
        "light": {
          "$value": "#FFFBEB",
          "$type": "color"
        },
        "border": {
          "$value": "#FDE68A",
          "$type": "color"
        },
        "base": {
          "$value": "#F59E0B",
          "$type": "color"
        },
        "dark": {
          "$value": "#92400E",
          "$type": "color"
        }
      },
      "danger": {
        "light": {
          "$value": "#FEF2F2",
          "$type": "color"
        },
        "border": {
          "$value": "#FECACA",
          "$type": "color"
        },
        "base": {
          "$value": "#EF4444",
          "$type": "color"
        },
        "dark": {
          "$value": "#991B1B",
          "$type": "color"
        }
      },
      "info": {
        "light": {
          "$value": "#F0F9FF",
          "$type": "color"
        },
        "border": {
          "$value": "#BAE6FD",
          "$type": "color"
        },
        "base": {
          "$value": "#0EA5E9",
          "$type": "color"
        },
        "dark": {
          "$value": "#075985",
          "$type": "color"
        }
      }
    },
    "ai-special": {
      "accent-primary": {
        "$value": "#7C3AED",
        "$type": "color",
        "$description": "AI core brand accent placeholder"
      },
      "accent-secondary": {
        "$value": "#EC4899",
        "$type": "color",
        "$description": "AI complementary gradient accent"
      },
      "accent-cyan": {
        "$value": "#06B6D4",
        "$type": "color",
        "$description": "AI streaming/sparkle accent"
      },
      "glow-ambient": {
        "$value": "rgba(124, 58, 237, 0.15)",
        "$type": "color"
      },
      "glow-active": {
        "$value": "rgba(124, 58, 237, 0.35)",
        "$type": "color"
      },
      "surface-shimmer": {
        "$value": "rgba(255, 255, 255, 0.4)",
        "$type": "color"
      }
    },
    "chart-palette": {
      "series-1": {
        "$value": "#2563EB",
        "$type": "color"
      },
      "series-2": {
        "$value": "#7C3AED",
        "$type": "color"
      },
      "series-3": {
        "$value": "#0D9488",
        "$type": "color"
      },
      "series-4": {
        "$value": "#F59E0B",
        "$type": "color"
      },
      "series-5": {
        "$value": "#EC4899",
        "$type": "color"
      },
      "series-6": {
        "$value": "#06B6D4",
        "$type": "color"
      },
      "series-7": {
        "$value": "#84CC16",
        "$type": "color"
      },
      "series-8": {
        "$value": "#64748B",
        "$type": "color"
      }
    }
  },
  "typography": {
    "font-family": {
      "sans": {
        "$value": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        "$type": "fontFamily",
        "$description": "Placeholder UI font stack"
      },
      "display": {
        "$value": "system-ui, -apple-system, sans-serif",
        "$type": "fontFamily",
        "$description": "Placeholder Display / Headline font stack"
      },
      "mono": {
        "$value": "'JetBrains Mono', 'Fira Code', 'Roboto Mono', Menlo, Monaco, Consolas, monospace",
        "$type": "fontFamily",
        "$description": "Code, tabular numbers & reasoning steps"
      }
    },
    "font-size": {
      "2xs": {
        "$value": "10px",
        "$type": "dimension"
      },
      "xs": {
        "$value": "12px",
        "$type": "dimension"
      },
      "sm": {
        "$value": "14px",
        "$type": "dimension"
      },
      "base": {
        "$value": "16px",
        "$type": "dimension"
      },
      "lg": {
        "$value": "18px",
        "$type": "dimension"
      },
      "xl": {
        "$value": "20px",
        "$type": "dimension"
      },
      "2xl": {
        "$value": "24px",
        "$type": "dimension"
      },
      "3xl": {
        "$value": "30px",
        "$type": "dimension"
      },
      "4xl": {
        "$value": "36px",
        "$type": "dimension"
      },
      "5xl": {
        "$value": "48px",
        "$type": "dimension"
      }
    },
    "font-weight": {
      "regular": {
        "$value": 400,
        "$type": "fontWeight"
      },
      "medium": {
        "$value": 500,
        "$type": "fontWeight"
      },
      "semibold": {
        "$value": 600,
        "$type": "fontWeight"
      },
      "bold": {
        "$value": 700,
        "$type": "fontWeight"
      }
    },
    "line-height": {
      "none": {
        "$value": "1",
        "$type": "dimension"
      },
      "tight": {
        "$value": "1.25",
        "$type": "dimension"
      },
      "snug": {
        "$value": "1.375",
        "$type": "dimension"
      },
      "normal": {
        "$value": "1.5",
        "$type": "dimension"
      },
      "relaxed": {
        "$value": "1.625",
        "$type": "dimension"
      },
      "loose": {
        "$value": "2",
        "$type": "dimension"
      }
    },
    "letter-spacing": {
      "tighter": {
        "$value": "-0.05em",
        "$type": "dimension"
      },
      "tight": {
        "$value": "-0.025em",
        "$type": "dimension"
      },
      "normal": {
        "$value": "0em",
        "$type": "dimension"
      },
      "wide": {
        "$value": "0.025em",
        "$type": "dimension"
      },
      "wider": {
        "$value": "0.05em",
        "$type": "dimension"
      }
    }
  },
  "spacing": {
    "0": {
      "$value": "0px",
      "$type": "dimension"
    },
    "1": {
      "$value": "2px",
      "$type": "dimension"
    },
    "2": {
      "$value": "4px",
      "$type": "dimension"
    },
    "3": {
      "$value": "6px",
      "$type": "dimension"
    },
    "4": {
      "$value": "8px",
      "$type": "dimension"
    },
    "6": {
      "$value": "12px",
      "$type": "dimension"
    },
    "8": {
      "$value": "16px",
      "$type": "dimension"
    },
    "10": {
      "$value": "20px",
      "$type": "dimension"
    },
    "12": {
      "$value": "24px",
      "$type": "dimension"
    },
    "16": {
      "$value": "32px",
      "$type": "dimension"
    },
    "20": {
      "$value": "40px",
      "$type": "dimension"
    },
    "24": {
      "$value": "48px",
      "$type": "dimension"
    },
    "32": {
      "$value": "64px",
      "$type": "dimension"
    },
    "40": {
      "$value": "80px",
      "$type": "dimension"
    },
    "48": {
      "$value": "96px",
      "$type": "dimension"
    }
  },
  "radius": {
    "none": {
      "$value": "0px",
      "$type": "dimension"
    },
    "xs": {
      "$value": "2px",
      "$type": "dimension"
    },
    "sm": {
      "$value": "4px",
      "$type": "dimension"
    },
    "md": {
      "$value": "6px",
      "$type": "dimension"
    },
    "lg": {
      "$value": "8px",
      "$type": "dimension"
    },
    "xl": {
      "$value": "12px",
      "$type": "dimension"
    },
    "2xl": {
      "$value": "16px",
      "$type": "dimension"
    },
    "3xl": {
      "$value": "24px",
      "$type": "dimension"
    },
    "full": {
      "$value": "9999px",
      "$type": "dimension"
    }
  },
  "shadow": {
    "none": {
      "$value": "none",
      "$type": "shadow"
    },
    "sm": {
      "$value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "$type": "shadow"
    },
    "md": {
      "$value": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
      "$type": "shadow"
    },
    "lg": {
      "$value": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
      "$type": "shadow"
    },
    "xl": {
      "$value": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      "$type": "shadow"
    },
    "ai-glow-subtle": {
      "$value": "0 0 15px 2px rgba(124, 58, 237, 0.18)",
      "$type": "shadow"
    },
    "ai-glow-focused": {
      "$value": "0 0 25px 4px rgba(124, 58, 237, 0.32)",
      "$type": "shadow"
    }
  },
  "motion": {
    "duration": {
      "instant": {
        "$value": "50ms",
        "$type": "duration"
      },
      "fast": {
        "$value": "150ms",
        "$type": "duration"
      },
      "normal": {
        "$value": "250ms",
        "$type": "duration"
      },
      "slow": {
        "$value": "400ms",
        "$type": "duration"
      },
      "ai-streaming-cursor": {
        "$value": "800ms",
        "$type": "duration"
      }
    },
    "easing": {
      "standard": {
        "$value": "cubic-bezier(0.2, 0, 0, 1)",
        "$type": "cubicBezier"
      },
      "decelerate": {
        "$value": "cubic-bezier(0, 0, 0.2, 1)",
        "$type": "cubicBezier"
      },
      "accelerate": {
        "$value": "cubic-bezier(0.4, 0, 1, 1)",
        "$type": "cubicBezier"
      },
      "spring": {
        "$value": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "$type": "cubicBezier"
      }
    }
  },
  "z-index": {
    "deep": {
      "$value": -1,
      "$type": "number"
    },
    "base": {
      "$value": 0,
      "$type": "number"
    },
    "docked": {
      "$value": 10,
      "$type": "number"
    },
    "dropdown": {
      "$value": 1000,
      "$type": "number"
    },
    "sticky": {
      "$value": 1100,
      "$type": "number"
    },
    "banner": {
      "$value": 1200,
      "$type": "number"
    },
    "drawer": {
      "$value": 1300,
      "$type": "number"
    },
    "modal": {
      "$value": 1400,
      "$type": "number"
    },
    "popover": {
      "$value": 1500,
      "$type": "number"
    },
    "toast": {
      "$value": 1600,
      "$type": "number"
    },
    "tooltip": {
      "$value": 1700,
      "$type": "number"
    }
  },
  "sys": {
    "color": {
      "surface": {
        "canvas": {
          "$value": "{color.neutral.50}",
          "$type": "color",
          "$description": "Main background for page or viewport"
        },
        "card": {
          "$value": "{color.neutral.0}",
          "$type": "color",
          "$description": "Standard container, KPI card and table background"
        },
        "elevated": {
          "$value": "{color.neutral.0}",
          "$type": "color",
          "$description": "Modals, popovers, dropdown menus"
        },
        "sunken": {
          "$value": "{color.neutral.100}",
          "$type": "color",
          "$description": "Code blocks, table headers, reasoning steps background"
        },
        "inverse": {
          "$value": "{color.neutral.900}",
          "$type": "color",
          "$description": "Tooltips, dark mode overlays, inverse banners"
        },
        "ai-subtle": {
          "$value": "{color.brand.placeholder-secondary.50}",
          "$type": "color",
          "$description": "AI message card, AI summary widget surface"
        },
        "ai-highlight": {
          "$value": "rgba(124, 58, 237, 0.08)",
          "$type": "color",
          "$description": "AI diff addition or inline suggestion background"
        }
      },
      "text": {
        "primary": {
          "$value": "{color.neutral.900}",
          "$type": "color",
          "$description": "Primary high-contrast readable text"
        },
        "secondary": {
          "$value": "{color.neutral.600}",
          "$type": "color",
          "$description": "Secondary labels, timestamps, KPI deltas"
        },
        "tertiary": {
          "$value": "{color.neutral.400}",
          "$type": "color",
          "$description": "Placeholders, disabled text, subtle hints"
        },
        "inverse": {
          "$value": "{color.neutral.0}",
          "$type": "color",
          "$description": "Text on dark surfaces or inverted tooltips"
        },
        "brand": {
          "$value": "{color.brand.placeholder-primary.600}",
          "$type": "color",
          "$description": "Brand colored text or links"
        },
        "ai-accent": {
          "$value": "{color.ai-special.accent-primary}",
          "$type": "color",
          "$description": "AI-generated label, sparkle icon color"
        },
        "code": {
          "$value": "{color.neutral.800}",
          "$type": "color",
          "$description": "Code blocks and reasoning logs"
        }
      },
      "border": {
        "subtle": {
          "$value": "{color.neutral.200}",
          "$type": "color",
          "$description": "Card borders, table dividers, panel splitters"
        },
        "default": {
          "$value": "{color.neutral.300}",
          "$type": "color",
          "$description": "Input field borders, standard button borders"
        },
        "strong": {
          "$value": "{color.neutral.400}",
          "$type": "color",
          "$description": "Active tabs, selected borders, high-contrast frames"
        },
        "focus": {
          "$value": "{color.brand.placeholder-primary.500}",
          "$type": "color",
          "$description": "Accessibility keyboard focus ring"
        },
        "ai": {
          "$value": "{color.ai-special.accent-primary}",
          "$type": "color",
          "$description": "AI composer focus ring, thinking accordion border"
        }
      },
      "interactive": {
        "primary": {
          "default": {
            "$value": "{color.brand.placeholder-primary.600}",
            "$type": "color"
          },
          "hover": {
            "$value": "{color.brand.placeholder-primary.700}",
            "$type": "color"
          },
          "active": {
            "$value": "{color.brand.placeholder-primary.800}",
            "$type": "color"
          },
          "disabled": {
            "$value": "{color.neutral.300}",
            "$type": "color"
          }
        },
        "ai-action": {
          "default": {
            "$value": "{color.ai-special.accent-primary}",
            "$type": "color"
          },
          "hover": {
            "$value": "#6D28D9",
            "$type": "color"
          },
          "subtle": {
            "$value": "{color.brand.placeholder-secondary.50}",
            "$type": "color"
          }
        }
      },
      "status": {
        "success": {
          "surface": {
            "$value": "{color.status.success.light}",
            "$type": "color"
          },
          "border": {
            "$value": "{color.status.success.border}",
            "$type": "color"
          },
          "text": {
            "$value": "{color.status.success.dark}",
            "$type": "color"
          },
          "icon": {
            "$value": "{color.status.success.base}",
            "$type": "color"
          }
        },
        "warning": {
          "surface": {
            "$value": "{color.status.warning.light}",
            "$type": "color"
          },
          "border": {
            "$value": "{color.status.warning.border}",
            "$type": "color"
          },
          "text": {
            "$value": "{color.status.warning.dark}",
            "$type": "color"
          },
          "icon": {
            "$value": "{color.status.warning.base}",
            "$type": "color"
          }
        },
        "danger": {
          "surface": {
            "$value": "{color.status.danger.light}",
            "$type": "color"
          },
          "border": {
            "$value": "{color.status.danger.border}",
            "$type": "color"
          },
          "text": {
            "$value": "{color.status.danger.dark}",
            "$type": "color"
          },
          "icon": {
            "$value": "{color.status.danger.base}",
            "$type": "color"
          }
        },
        "info": {
          "surface": {
            "$value": "{color.status.info.light}",
            "$type": "color"
          },
          "border": {
            "$value": "{color.status.info.border}",
            "$type": "color"
          },
          "text": {
            "$value": "{color.status.info.dark}",
            "$type": "color"
          },
          "icon": {
            "$value": "{color.status.info.base}",
            "$type": "color"
          }
        }
      }
    },
    "typography": {
      "display": {
        "large": {
          "fontFamily": "{typography.font-family.display}",
          "fontSize": "{typography.font-size.5xl}",
          "fontWeight": "{typography.font-weight.bold}",
          "lineHeight": "{typography.line-height.tight}",
          "letterSpacing": "{typography.letter-spacing.tight}"
        },
        "medium": {
          "fontFamily": "{typography.font-family.display}",
          "fontSize": "{typography.font-size.4xl}",
          "fontWeight": "{typography.font-weight.bold}",
          "lineHeight": "{typography.line-height.tight}"
        }
      },
      "kpi": {
        "metric-hero": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.4xl}",
          "fontWeight": "{typography.font-weight.bold}",
          "lineHeight": "{typography.line-height.none}",
          "fontFeatureSettings": "'tnum' on, 'cv02' on",
          "$description": "Tabular numerals for prominent KPI values"
        },
        "metric-standard": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.2xl}",
          "fontWeight": "{typography.font-weight.semibold}",
          "lineHeight": "{typography.line-height.tight}",
          "fontFeatureSettings": "'tnum' on"
        },
        "metric-delta": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.xs}",
          "fontWeight": "{typography.font-weight.medium}",
          "lineHeight": "{typography.line-height.normal}",
          "fontFeatureSettings": "'tnum' on"
        }
      },
      "heading": {
        "h1": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.3xl}",
          "fontWeight": "{typography.font-weight.bold}",
          "lineHeight": "{typography.line-height.tight}"
        },
        "h2": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.2xl}",
          "fontWeight": "{typography.font-weight.semibold}",
          "lineHeight": "{typography.line-height.snug}"
        },
        "h3": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.xl}",
          "fontWeight": "{typography.font-weight.semibold}",
          "lineHeight": "{typography.line-height.snug}"
        },
        "h4": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.lg}",
          "fontWeight": "{typography.font-weight.medium}",
          "lineHeight": "{typography.line-height.normal}"
        }
      },
      "body": {
        "large": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.base}",
          "fontWeight": "{typography.font-weight.regular}",
          "lineHeight": "{typography.line-height.normal}"
        },
        "default": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.sm}",
          "fontWeight": "{typography.font-weight.regular}",
          "lineHeight": "{typography.line-height.normal}"
        },
        "dense": {
          "fontFamily": "{typography.font-family.sans}",
          "fontSize": "{typography.font-size.xs}",
          "fontWeight": "{typography.font-weight.regular}",
          "lineHeight": "{typography.line-height.snug}",
          "$description": "Compact data table cells & dense metadata"
        }
      },
      "code": {
        "inline": {
          "fontFamily": "{typography.font-family.mono}",
          "fontSize": "{typography.font-size.xs}",
          "fontWeight": "{typography.font-weight.regular}"
        },
        "block": {
          "fontFamily": "{typography.font-family.mono}",
          "fontSize": "{typography.font-size.sm}",
          "lineHeight": "{typography.line-height.relaxed}"
        },
        "reasoning": {
          "fontFamily": "{typography.font-family.mono}",
          "fontSize": "{typography.font-size.xs}",
          "lineHeight": "{typography.line-height.normal}",
          "$description": "AI model reasoning steps & chain of thought"
        }
      }
    }
  },
  "responsive": {
    "breakpoint": {
      "mobile": {
        "min": {
          "$value": "320px",
          "$type": "dimension"
        },
        "max": {
          "$value": "767px",
          "$type": "dimension"
        },
        "columns": {
          "$value": 4,
          "$type": "number"
        },
        "margin": {
          "$value": "16px",
          "$type": "dimension"
        },
        "gutter": {
          "$value": "12px",
          "$type": "dimension"
        },
        "minTapTarget": {
          "$value": "44px",
          "$type": "dimension"
        }
      },
      "tablet": {
        "min": {
          "$value": "768px",
          "$type": "dimension"
        },
        "max": {
          "$value": "1023px",
          "$type": "dimension"
        },
        "columns": {
          "$value": 8,
          "$type": "number"
        },
        "margin": {
          "$value": "24px",
          "$type": "dimension"
        },
        "gutter": {
          "$value": "16px",
          "$type": "dimension"
        },
        "minTapTarget": {
          "$value": "44px",
          "$type": "dimension"
        }
      },
      "laptop": {
        "min": {
          "$value": "1024px",
          "$type": "dimension"
        },
        "max": {
          "$value": "1439px",
          "$type": "dimension"
        },
        "columns": {
          "$value": 12,
          "$type": "number"
        },
        "margin": {
          "$value": "32px",
          "$type": "dimension"
        },
        "gutter": {
          "$value": "20px",
          "$type": "dimension"
        },
        "minTapTarget": {
          "$value": "32px",
          "$type": "dimension"
        }
      },
      "desktop-wide": {
        "min": {
          "$value": "1440px",
          "$type": "dimension"
        },
        "columns": {
          "$value": 12,
          "$type": "number"
        },
        "margin": {
          "$value": "40px",
          "$type": "dimension"
        },
        "gutter": {
          "$value": "24px",
          "$type": "dimension"
        },
        "maxContainerWidth": {
          "$value": "1600px",
          "$type": "dimension"
        },
        "minTapTarget": {
          "$value": "32px",
          "$type": "dimension"
        }
      }
    },
    "density": {
      "compact": {
        "tableRowHeight": {
          "$value": "32px",
          "$type": "dimension"
        },
        "tableCellPaddingX": {
          "$value": "8px",
          "$type": "dimension"
        },
        "tableCellPaddingY": {
          "$value": "4px",
          "$type": "dimension"
        },
        "inputHeight": {
          "$value": "32px",
          "$type": "dimension"
        },
        "buttonHeight": {
          "$value": "32px",
          "$type": "dimension"
        },
        "kpiPadding": {
          "$value": "12px",
          "$type": "dimension"
        }
      },
      "comfortable": {
        "tableRowHeight": {
          "$value": "44px",
          "$type": "dimension"
        },
        "tableCellPaddingX": {
          "$value": "16px",
          "$type": "dimension"
        },
        "tableCellPaddingY": {
          "$value": "10px",
          "$type": "dimension"
        },
        "inputHeight": {
          "$value": "40px",
          "$type": "dimension"
        },
        "buttonHeight": {
          "$value": "40px",
          "$type": "dimension"
        },
        "kpiPadding": {
          "$value": "20px",
          "$type": "dimension"
        }
      },
      "spacious": {
        "tableRowHeight": {
          "$value": "56px",
          "$type": "dimension"
        },
        "tableCellPaddingX": {
          "$value": "20px",
          "$type": "dimension"
        },
        "tableCellPaddingY": {
          "$value": "16px",
          "$type": "dimension"
        },
        "inputHeight": {
          "$value": "48px",
          "$type": "dimension"
        },
        "buttonHeight": {
          "$value": "48px",
          "$type": "dimension"
        },
        "kpiPadding": {
          "$value": "24px",
          "$type": "dimension"
        }
      }
    }
  },
  "component": {
    "alert": {
      "radius": {
        "$value": "{radius.xl}",
        "$type": "dimension"
      },
      "borderWidth": {
        "$value": "1px",
        "$type": "dimension"
      },
      "padding": {
        "$value": "{spacing.4}",
        "$type": "dimension"
      },
      "variants": {
        "info": {
          "background": {
            "$value": "{sys.color.status.info.surface}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.info.border}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.info.text}",
            "$type": "color"
          }
        },
        "success": {
          "background": {
            "$value": "{sys.color.status.success.surface}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.success.border}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.success.text}",
            "$type": "color"
          }
        },
        "warning": {
          "background": {
            "$value": "{sys.color.status.warning.surface}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.warning.border}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.warning.text}",
            "$type": "color"
          }
        },
        "danger": {
          "background": {
            "$value": "{sys.color.status.danger.surface}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.danger.border}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.danger.text}",
            "$type": "color"
          }
        }
      }
    },
    "badge": {
      "radius": {
        "$value": "{radius.full}",
        "$type": "dimension"
      },
      "font": {
        "size": {
          "$value": "{typography.font-size.xs}",
          "$type": "dimension"
        },
        "weight": {
          "$value": "{typography.font-weight.bold}",
          "$type": "fontWeight"
        },
        "fontVariantNumeric": {
          "$value": "tabular-nums",
          "$type": "string"
        }
      },
      "padding": {
        "x": {
          "$value": "{spacing.2-5}",
          "$type": "dimension"
        },
        "y": {
          "$value": "{spacing.0-5}",
          "$type": "dimension"
        }
      },
      "variants": {
        "success": {
          "background": {
            "$value": "{sys.color.status.success.surface}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.success.text}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.success.border}",
            "$type": "color"
          }
        },
        "warning": {
          "background": {
            "$value": "{sys.color.status.warning.surface}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.warning.text}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.warning.border}",
            "$type": "color"
          }
        },
        "danger": {
          "background": {
            "$value": "{sys.color.status.danger.surface}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.danger.text}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.danger.border}",
            "$type": "color"
          }
        },
        "info": {
          "background": {
            "$value": "{sys.color.status.info.surface}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.info.text}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.info.border}",
            "$type": "color"
          }
        },
        "neutral": {
          "background": {
            "$value": "{sys.color.surface.sunken}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.secondary}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.border.subtle}",
            "$type": "color"
          }
        },
        "ai": {
          "background": {
            "$value": "rgba(124, 58, 237, 0.12)",
            "$type": "color"
          },
          "text": {
            "$value": "{color.ai-special.accent-primary}",
            "$type": "color"
          },
          "border": {
            "$value": "rgba(124, 58, 237, 0.3)",
            "$type": "color"
          }
        }
      }
    },
    "button": {
      "radius": {
        "sm": {
          "$value": "{radius.md}",
          "$type": "dimension"
        },
        "md": {
          "$value": "{radius.lg}",
          "$type": "dimension"
        },
        "lg": {
          "$value": "{radius.xl}",
          "$type": "dimension"
        },
        "pill": {
          "$value": "{radius.full}",
          "$type": "dimension"
        }
      },
      "spacing": {
        "sm": {
          "paddingX": {
            "$value": "{spacing.3}",
            "$type": "dimension"
          },
          "paddingY": {
            "$value": "{spacing.1-5}",
            "$type": "dimension"
          },
          "fontSize": {
            "$value": "{typography.font-size.xs}",
            "$type": "dimension"
          },
          "gap": {
            "$value": "{spacing.1-5}",
            "$type": "dimension"
          }
        },
        "md": {
          "paddingX": {
            "$value": "{spacing.4}",
            "$type": "dimension"
          },
          "paddingY": {
            "$value": "{spacing.2-5}",
            "$type": "dimension"
          },
          "fontSize": {
            "$value": "{typography.font-size.sm}",
            "$type": "dimension"
          },
          "gap": {
            "$value": "{spacing.2}",
            "$type": "dimension"
          }
        },
        "lg": {
          "paddingX": {
            "$value": "{spacing.6}",
            "$type": "dimension"
          },
          "paddingY": {
            "$value": "{spacing.3}",
            "$type": "dimension"
          },
          "fontSize": {
            "$value": "{typography.font-size.base}",
            "$type": "dimension"
          },
          "gap": {
            "$value": "{spacing.2-5}",
            "$type": "dimension"
          }
        }
      },
      "variant": {
        "primary": {
          "background": {
            "$value": "{sys.color.brand.primary}",
            "$type": "color"
          },
          "text": {
            "$value": "#ffffff",
            "$type": "color"
          },
          "border": {
            "$value": "transparent",
            "$type": "color"
          },
          "hover": {
            "background": {
              "$value": "{color.brand.placeholder-primary.700}",
              "$type": "color"
            }
          }
        },
        "secondary": {
          "background": {
            "$value": "{sys.color.surface.card}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.primary}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.border.default}",
            "$type": "color"
          },
          "hover": {
            "background": {
              "$value": "{sys.color.surface.sunken}",
              "$type": "color"
            }
          }
        },
        "outline": {
          "background": {
            "$value": "transparent",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.brand.primary}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.brand.primary}",
            "$type": "color"
          },
          "hover": {
            "background": {
              "$value": "{color.brand.placeholder-primary.50}",
              "$type": "color"
            }
          }
        },
        "ghost": {
          "background": {
            "$value": "transparent",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.secondary}",
            "$type": "color"
          },
          "border": {
            "$value": "transparent",
            "$type": "color"
          },
          "hover": {
            "background": {
              "$value": "{sys.color.surface.sunken}",
              "$type": "color"
            },
            "text": {
              "$value": "{sys.color.text.primary}",
              "$type": "color"
            }
          }
        },
        "danger": {
          "background": {
            "$value": "{sys.color.status.danger.surface}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.danger.text}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.danger.border}",
            "$type": "color"
          },
          "hover": {
            "background": {
              "$value": "{color.danger.600}",
              "$type": "color"
            },
            "text": {
              "$value": "#ffffff",
              "$type": "color"
            }
          }
        },
        "ai": {
          "background": {
            "$value": "linear-gradient(135deg, {sys.color.brand.primary}, {color.ai-special.accent-primary})",
            "$type": "string"
          },
          "text": {
            "$value": "#ffffff",
            "$type": "color"
          },
          "border": {
            "$value": "transparent",
            "$type": "color"
          },
          "shadow": {
            "$value": "{color.ai-special.glow}",
            "$type": "shadow"
          }
        }
      }
    },
    "chip": {
      "radius": {
        "$value": "{radius.full}",
        "$type": "dimension"
      },
      "height": {
        "sm": {
          "$value": "26px",
          "$type": "dimension"
        },
        "md": {
          "$value": "32px",
          "$type": "dimension"
        }
      },
      "font": {
        "size": {
          "$value": "{typography.font-size.xs}",
          "$type": "dimension"
        },
        "weight": {
          "$value": "{typography.font-weight.medium}",
          "$type": "fontWeight"
        }
      },
      "padding": {
        "x": {
          "$value": "{spacing.3}",
          "$type": "dimension"
        },
        "y": {
          "$value": "{spacing.1}",
          "$type": "dimension"
        }
      },
      "variants": {
        "filter": {
          "default": {
            "background": {
              "$value": "{sys.color.surface.sunken}",
              "$type": "color"
            },
            "text": {
              "$value": "{sys.color.text.secondary}",
              "$type": "color"
            },
            "border": {
              "$value": "{sys.color.border.default}",
              "$type": "color"
            }
          },
          "active": {
            "background": {
              "$value": "rgba(37, 99, 235, 0.1)",
              "$type": "color"
            },
            "text": {
              "$value": "{sys.color.brand.primary}",
              "$type": "color"
            },
            "border": {
              "$value": "{sys.color.brand.primary}",
              "$type": "color"
            }
          }
        },
        "input": {
          "background": {
            "$value": "{sys.color.surface.card}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.primary}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.border.default}",
            "$type": "color"
          }
        },
        "suggestion": {
          "background": {
            "$value": "{sys.color.surface.card}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.secondary}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.border.subtle}",
            "$type": "color"
          }
        },
        "assist": {
          "background": {
            "$value": "rgba(124, 58, 237, 0.08)",
            "$type": "color"
          },
          "text": {
            "$value": "{color.ai-special.accent-primary}",
            "$type": "color"
          },
          "border": {
            "$value": "rgba(124, 58, 237, 0.25)",
            "$type": "color"
          }
        }
      }
    },
    "dataTable": {
      "surface": {
        "header": {
          "$value": "{color.neutral.50}",
          "$type": "color"
        },
        "row": {
          "$value": "{color.neutral.0}",
          "$type": "color"
        },
        "rowZebra": {
          "$value": "{color.neutral.50}",
          "$type": "color"
        },
        "rowHover": {
          "$value": "{color.neutral.100}",
          "$type": "color"
        },
        "rowSelected": {
          "$value": "{color.brand.placeholder-primary.50}",
          "$type": "color"
        },
        "pinnedColumn": {
          "$value": "{color.neutral.0}",
          "$type": "color"
        }
      },
      "border": {
        "outer": {
          "$value": "{sys.color.border.subtle}",
          "$type": "color"
        },
        "cell": {
          "$value": "{sys.color.border.subtle}",
          "$type": "color"
        },
        "selected": {
          "$value": "{sys.color.border.focus}",
          "$type": "color"
        },
        "radius": {
          "$value": "{radius.xl}",
          "$type": "dimension"
        }
      },
      "header": {
        "fontSize": {
          "$value": "{typography.font-size.xs}",
          "$type": "dimension"
        },
        "fontWeight": {
          "$value": "{typography.font-weight.semibold}",
          "$type": "fontWeight"
        },
        "color": {
          "$value": "{sys.color.text.secondary}",
          "$type": "color"
        },
        "sortIconSize": {
          "$value": "14px",
          "$type": "dimension"
        }
      },
      "cell": {
        "fontSize": {
          "$value": "{typography.font-size.sm}",
          "$type": "dimension"
        },
        "color": {
          "$value": "{sys.color.text.primary}",
          "$type": "color"
        },
        "numericFontVariant": {
          "$value": "tabular-nums",
          "$type": "string"
        }
      },
      "pinnedDivider": {
        "shadow": {
          "$value": "4px 0 8px -2px rgba(0, 0, 0, 0.08)",
          "$type": "shadow"
        }
      },
      "pagination": {
        "height": {
          "$value": "48px",
          "$type": "dimension"
        },
        "borderTop": {
          "$value": "{sys.color.border.subtle}",
          "$type": "color"
        },
        "fontSize": {
          "$value": "{typography.font-size.xs}",
          "$type": "dimension"
        }
      }
    },
    "genAi": {
      "composer": {
        "surface": {
          "$value": "{color.neutral.0}",
          "$type": "color"
        },
        "borderDefault": {
          "$value": "{sys.color.border.default}",
          "$type": "color"
        },
        "borderFocus": {
          "$value": "{sys.color.border.ai}",
          "$type": "color"
        },
        "shadowFocus": {
          "$value": "{shadow.ai-glow-subtle}",
          "$type": "shadow"
        },
        "radius": {
          "$value": "{radius.2xl}",
          "$type": "dimension"
        },
        "padding": {
          "$value": "{spacing.4}",
          "$type": "dimension"
        },
        "minHeight": {
          "$value": "56px",
          "$type": "dimension"
        },
        "maxHeight": {
          "$value": "240px",
          "$type": "dimension"
        }
      },
      "tokenCounter": {
        "fontFamily": "{typography.font-family.mono}",
        "fontSize": "{typography.font-size.2xs}",
        "color": "{sys.color.text.secondary}",
        "warningColor": "{sys.color.status.warning.text}"
      },
      "chatBubble": {
        "user": {
          "surface": {
            "$value": "{color.neutral.100}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.primary}",
            "$type": "color"
          },
          "radius": {
            "$value": "16px 16px 4px 16px",
            "$type": "string"
          }
        },
        "assistant": {
          "surface": {
            "$value": "{color.neutral.0}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.border.subtle}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.primary}",
            "$type": "color"
          },
          "radius": {
            "$value": "16px 16px 16px 4px",
            "$type": "string"
          },
          "aiAccentBadge": {
            "$value": "{color.ai-special.accent-primary}",
            "$type": "color"
          }
        }
      },
      "reasoningAccordion": {
        "surface": {
          "$value": "{color.neutral.50}",
          "$type": "color"
        },
        "border": {
          "$value": "{sys.color.border.subtle}",
          "$type": "color"
        },
        "activeBorder": {
          "$value": "{color.ai-special.accent-cyan}",
          "$type": "color"
        },
        "radius": {
          "$value": "{radius.lg}",
          "$type": "dimension"
        },
        "text": {
          "$value": "{sys.color.text.secondary}",
          "$type": "color"
        },
        "fontFamily": "{typography.font-family.mono}",
        "fontSize": "{typography.font-size.xs}",
        "shimmerDuration": {
          "$value": "1.5s",
          "$type": "duration"
        }
      },
      "citationPill": {
        "surface": {
          "$value": "{color.neutral.100}",
          "$type": "color"
        },
        "surfaceHover": {
          "$value": "{color.brand.placeholder-secondary.50}",
          "$type": "color"
        },
        "text": {
          "$value": "{color.ai-special.accent-primary}",
          "$type": "color"
        },
        "border": {
          "$value": "{sys.color.border.subtle}",
          "$type": "color"
        },
        "radius": {
          "$value": "{radius.full}",
          "$type": "dimension"
        },
        "fontSize": {
          "$value": "{typography.font-size.2xs}",
          "$type": "dimension"
        },
        "fontWeight": {
          "$value": "{typography.font-weight.semibold}",
          "$type": "fontWeight"
        }
      },
      "diff": {
        "addition": {
          "surface": {
            "$value": "rgba(16, 185, 129, 0.12)",
            "$type": "color"
          },
          "border": {
            "$value": "rgba(16, 185, 129, 0.35)",
            "$type": "color"
          },
          "text": {
            "$value": "#065F46",
            "$type": "color"
          }
        },
        "deletion": {
          "surface": {
            "$value": "rgba(239, 68, 68, 0.12)",
            "$type": "color"
          },
          "border": {
            "$value": "rgba(239, 68, 68, 0.35)",
            "$type": "color"
          },
          "text": {
            "$value": "#991B1B",
            "$type": "color"
          }
        }
      },
      "streamingCursor": {
        "color": {
          "$value": "{color.ai-special.accent-primary}",
          "$type": "color"
        },
        "width": {
          "$value": "8px",
          "$type": "dimension"
        },
        "height": {
          "$value": "15px",
          "$type": "dimension"
        },
        "radius": {
          "$value": "2px",
          "$type": "dimension"
        }
      }
    },
    "input": {
      "surface": {
        "default": {
          "$value": "{sys.color.surface.card}",
          "$type": "color"
        },
        "disabled": {
          "$value": "{sys.color.surface.sunken}",
          "$type": "color"
        }
      },
      "border": {
        "default": {
          "$value": "{sys.color.border.default}",
          "$type": "color"
        },
        "focus": {
          "$value": "{sys.color.brand.primary}",
          "$type": "color"
        },
        "error": {
          "$value": "{sys.color.status.danger.border}",
          "$type": "color"
        },
        "width": {
          "$value": "1.5px",
          "$type": "dimension"
        },
        "radius": {
          "$value": "{radius.md}",
          "$type": "dimension"
        }
      },
      "text": {
        "value": {
          "$value": "{sys.color.text.primary}",
          "$type": "color"
        },
        "placeholder": {
          "$value": "{sys.color.text.tertiary}",
          "$type": "color"
        },
        "disabled": {
          "$value": "{sys.color.text.tertiary}",
          "$type": "color"
        }
      },
      "height": {
        "sm": {
          "$value": "32px",
          "$type": "dimension"
        },
        "md": {
          "$value": "40px",
          "$type": "dimension"
        },
        "lg": {
          "$value": "48px",
          "$type": "dimension"
        }
      },
      "paddingX": {
        "sm": {
          "$value": "{spacing.2-5}",
          "$type": "dimension"
        },
        "md": {
          "$value": "{spacing.3-5}",
          "$type": "dimension"
        },
        "lg": {
          "$value": "{spacing.4}",
          "$type": "dimension"
        }
      }
    },
    "kpiCard": {
      "surface": {
        "$value": "{sys.color.surface.card}",
        "$type": "color"
      },
      "border": {
        "color": {
          "$value": "{sys.color.border.subtle}",
          "$type": "color"
        },
        "width": {
          "$value": "1px",
          "$type": "dimension"
        },
        "radius": {
          "$value": "{radius.xl}",
          "$type": "dimension"
        }
      },
      "shadow": {
        "default": {
          "$value": "{shadow.sm}",
          "$type": "shadow"
        },
        "hover": {
          "$value": "{shadow.md}",
          "$type": "shadow"
        }
      },
      "padding": {
        "comfortable": {
          "$value": "{spacing.6}",
          "$type": "dimension"
        },
        "compact": {
          "$value": "{spacing.4}",
          "$type": "dimension"
        }
      },
      "eyebrow": {
        "color": {
          "$value": "{sys.color.text.secondary}",
          "$type": "color"
        },
        "fontSize": {
          "$value": "{typography.font-size.xs}",
          "$type": "dimension"
        },
        "fontWeight": {
          "$value": "{typography.font-weight.medium}",
          "$type": "fontWeight"
        },
        "textTransform": {
          "$value": "uppercase",
          "$type": "string"
        },
        "letterSpacing": {
          "$value": "{typography.letter-spacing.wide}",
          "$type": "dimension"
        }
      },
      "metric": {
        "color": {
          "$value": "{sys.color.text.primary}",
          "$type": "color"
        },
        "fontSize": {
          "$value": "{typography.font-size.3xl}",
          "$type": "dimension"
        },
        "fontWeight": {
          "$value": "{typography.font-weight.bold}",
          "$type": "fontWeight"
        },
        "fontVariantNumeric": {
          "$value": "tabular-nums",
          "$type": "string"
        }
      },
      "delta": {
        "positive": {
          "background": {
            "$value": "{sys.color.status.success.surface}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.success.text}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.success.border}",
            "$type": "color"
          }
        },
        "negative": {
          "background": {
            "$value": "{sys.color.status.danger.surface}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.status.danger.text}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.status.danger.border}",
            "$type": "color"
          }
        },
        "neutral": {
          "background": {
            "$value": "{color.neutral.100}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.secondary}",
            "$type": "color"
          },
          "border": {
            "$value": "{color.neutral.200}",
            "$type": "color"
          }
        },
        "radius": {
          "$value": "{radius.full}",
          "$type": "dimension"
        },
        "paddingX": {
          "$value": "{spacing.2}",
          "$type": "dimension"
        },
        "paddingY": {
          "$value": "{spacing.1}",
          "$type": "dimension"
        }
      },
      "sparkline": {
        "height": {
          "laptop": {
            "$value": "56px",
            "$type": "dimension"
          },
          "tablet": {
            "$value": "48px",
            "$type": "dimension"
          },
          "mobile": {
            "$value": "40px",
            "$type": "dimension"
          }
        },
        "strokeWidth": {
          "$value": "2px",
          "$type": "dimension"
        },
        "fillOpacity": {
          "$value": 0.15,
          "$type": "number"
        }
      }
    },
    "modal": {
      "backdrop": {
        "color": {
          "$value": "rgba(15, 23, 42, 0.6)",
          "$type": "color"
        },
        "blur": {
          "$value": "4px",
          "$type": "dimension"
        }
      },
      "surface": {
        "$value": "{sys.color.surface.card}",
        "$type": "color"
      },
      "border": {
        "color": {
          "$value": "{sys.color.border.default}",
          "$type": "color"
        },
        "width": {
          "$value": "1px",
          "$type": "dimension"
        },
        "radius": {
          "$value": "{radius.2xl}",
          "$type": "dimension"
        }
      },
      "shadow": {
        "$value": "{shadow.xl}",
        "$type": "shadow"
      },
      "padding": {
        "$value": "{spacing.6}",
        "$type": "dimension"
      }
    },
    "progress": {
      "linear": {
        "height": {
          "sm": {
            "$value": "4px",
            "$type": "dimension"
          },
          "md": {
            "$value": "8px",
            "$type": "dimension"
          },
          "lg": {
            "$value": "12px",
            "$type": "dimension"
          }
        },
        "track": {
          "$value": "{sys.color.surface.sunken}",
          "$type": "color"
        },
        "fill": {
          "$value": "{sys.color.brand.primary}",
          "$type": "color"
        },
        "radius": {
          "$value": "{radius.full}",
          "$type": "dimension"
        }
      },
      "circular": {
        "size": {
          "sm": {
            "$value": "24px",
            "$type": "dimension"
          },
          "md": {
            "$value": "40px",
            "$type": "dimension"
          },
          "lg": {
            "$value": "64px",
            "$type": "dimension"
          }
        },
        "stroke": {
          "sm": {
            "$value": "2.5px",
            "$type": "dimension"
          },
          "md": {
            "$value": "4px",
            "$type": "dimension"
          },
          "lg": {
            "$value": "6px",
            "$type": "dimension"
          }
        },
        "track": {
          "$value": "{sys.color.surface.sunken}",
          "$type": "color"
        },
        "fill": {
          "$value": "{sys.color.brand.primary}",
          "$type": "color"
        }
      }
    },
    "sideSheet": {
      "width": {
        "sm": {
          "$value": "360px",
          "$type": "dimension"
        },
        "md": {
          "$value": "440px",
          "$type": "dimension"
        },
        "lg": {
          "$value": "600px",
          "$type": "dimension"
        }
      },
      "surface": {
        "$value": "{sys.color.surface.card}",
        "$type": "color"
      },
      "border": {
        "color": {
          "$value": "{sys.color.border.default}",
          "$type": "color"
        },
        "width": {
          "$value": "1px",
          "$type": "dimension"
        }
      },
      "shadow": {
        "$value": "{shadow.xl}",
        "$type": "shadow"
      },
      "backdrop": {
        "color": {
          "$value": "rgba(15, 23, 42, 0.5)",
          "$type": "color"
        },
        "blur": {
          "$value": "4px",
          "$type": "dimension"
        }
      },
      "padding": {
        "$value": "{spacing.6}",
        "$type": "dimension"
      }
    },
    "sidebar": {
      "width": {
        "expanded": {
          "$value": "260px",
          "$type": "dimension"
        },
        "collapsed": {
          "$value": "68px",
          "$type": "dimension"
        }
      },
      "surface": {
        "$value": "{sys.color.surface.card}",
        "$type": "color"
      },
      "border": {
        "color": {
          "$value": "{sys.color.border.subtle}",
          "$type": "color"
        },
        "width": {
          "$value": "1px",
          "$type": "dimension"
        }
      },
      "item": {
        "height": {
          "$value": "40px",
          "$type": "dimension"
        },
        "radius": {
          "$value": "{radius.lg}",
          "$type": "dimension"
        },
        "active": {
          "background": {
            "$value": "rgba(37, 99, 235, 0.1)",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.brand.primary}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.brand.primary}",
            "$type": "color"
          }
        },
        "inactive": {
          "background": {
            "$value": "transparent",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.secondary}",
            "$type": "color"
          },
          "hover": {
            "background": {
              "$value": "{sys.color.surface.sunken}",
              "$type": "color"
            },
            "text": {
              "$value": "{sys.color.text.primary}",
              "$type": "color"
            }
          }
        }
      }
    },
    "tabs": {
      "underline": {
        "active": {
          "text": {
            "$value": "{sys.color.brand.primary}",
            "$type": "color"
          },
          "border": {
            "$value": "{sys.color.brand.primary}",
            "$type": "color"
          }
        },
        "inactive": {
          "text": {
            "$value": "{sys.color.text.secondary}",
            "$type": "color"
          },
          "border": {
            "$value": "transparent",
            "$type": "color"
          }
        }
      },
      "segmented": {
        "surface": {
          "$value": "{sys.color.surface.sunken}",
          "$type": "color"
        },
        "radius": {
          "$value": "{radius.lg}",
          "$type": "dimension"
        },
        "active": {
          "background": {
            "$value": "{sys.color.surface.card}",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.primary}",
            "$type": "color"
          },
          "shadow": {
            "$value": "{shadow.sm}",
            "$type": "shadow"
          }
        },
        "inactive": {
          "background": {
            "$value": "transparent",
            "$type": "color"
          },
          "text": {
            "$value": "{sys.color.text.secondary}",
            "$type": "color"
          }
        }
      }
    }
  }
} as const;

export type TokenDictionary = typeof DesignTokens;
export type ColorPalette = keyof typeof DesignTokens.color;
export type SpacingScale = keyof typeof DesignTokens.spacing;
export type TypographyScale = keyof typeof DesignTokens.typography.fontSize;
